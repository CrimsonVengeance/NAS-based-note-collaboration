package com.example.demo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
	@GetMapping("/api/hello")
	public String sayHello() {
		return "Hello From Spring Boot, and Me!";
	}
}
