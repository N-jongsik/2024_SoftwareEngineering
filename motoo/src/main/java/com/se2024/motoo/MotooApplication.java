package com.se2024.motoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MotooApplication {

	public static void main(String[] args) {
		System.setProperty("javax.xml.accessExternalDTD", "all");
		SpringApplication.run(MotooApplication.class, args);
	}

}
