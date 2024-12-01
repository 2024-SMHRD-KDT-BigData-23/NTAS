package com.smhrd.namnam.jwt;

import com.smhrd.namnam.entity.StaffInfo;
import com.smhrd.namnam.service.CustomUserDetails;
import com.smhrd.namnam.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserService userService;

    public JWTFilter(JWTUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = authorization.split(" ")[1];
        if (jwtUtil.isExpired(token)) {
            filterChain.doFilter(request, response);
            return;
        }
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);
        Optional<StaffInfo> staffInfoOptional = userService.findById(username);
        if (staffInfoOptional.isPresent()) {
            StaffInfo staffInfo = staffInfoOptional.get();
            CustomUserDetails customUserDetails = new CustomUserDetails(staffInfo);
            Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }
}
