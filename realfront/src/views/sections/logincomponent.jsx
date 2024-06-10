import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/scss/login.scss';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                staffId: username,
                staffPw: password
            }, { withCredentials: true });
            if (response.data === "Login Successful") {
                sessionStorage.setItem("staffId", username); // 브라우저 세션에 사용자 아이디 저장
                if(username ==='admin' && password === 'admin'){
                    navigate('/admin'); 
                } else {
                    navigate('/present/List/All');
            }
            } else {
                setError('로그인 실패. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Error logging in', error);
            setError('로그인 실패. 다시 시도해 주세요.');
        }
    };

    return (
        <div className='loginbox'>
            <h1 className="title font-bold">NCDSS</h1>
            <form onSubmit={handleLogin}>
                <div className="idpwbox">
                    <input
                        type="text"
                        placeholder="아이디를 입력하세요."
                        className="logininput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        className="logininput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className='loginButton'>SIGN IN</button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginComponent;
