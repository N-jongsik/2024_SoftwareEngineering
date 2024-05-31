package com.se2024.motoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MotooApplication {

	public static void main(String[] args) {
		SpringApplication.run(MotooApplication.class, args);
	}

}
