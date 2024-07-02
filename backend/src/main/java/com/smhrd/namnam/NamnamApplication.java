package com.smhrd.namnam;

import com.smhrd.namnam.config.DataLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.smhrd.namnam.repository")
public class NamnamApplication implements CommandLineRunner {

	// 더미 데이터 생성 클래스
	@Autowired
	private DataLoader dataLoader;

	// 스프링 부트 실행
	public static void main(String[] args) {
		SpringApplication.run(NamnamApplication.class, args);
	}

	// 더미 데이터 생성 실행
	@Override
	public void run(String... args) throws Exception {
//		dataLoader.ExGenerateData();
//		dataLoader.InGenerateData();
//		dataLoader.randomGenerateData();
	}

}
