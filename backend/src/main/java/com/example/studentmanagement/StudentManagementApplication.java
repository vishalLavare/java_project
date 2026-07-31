package com.example.studentmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point.
 * @SpringBootApplication encapsulates:
 * 1. @Configuration: Tags the class as a source of bean definitions.
 * 2. @EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings.
 * 3. @ComponentScan: Scans for controllers, services, and beans in com.example.studentmanagement package.
 */
@SpringBootApplication
public class StudentManagementApplication {

    public static void main(String[] args) {
        // Starts the embedded Tomcat web server on port 8080 and launches Spring Boot
        SpringApplication.run(StudentManagementApplication.class, args);
    }
}
