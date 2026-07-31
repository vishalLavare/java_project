package com.example.studentmanagement.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Objects;

/**
 * Student Model Class
 * Represents a Student entity in the database with personal and academic attributes.
 * Includes JPA annotations for Database Persistence and Jakarta Validation.
 */
@Entity
@Table(name = "students")
public class Student {

    // Unique Identifier for each student (Primary Key, Auto-Increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student's full name (Cannot be empty or whitespace)
    @NotBlank(message = "Name is required and cannot be blank")
    private String name;

    // Student's email address (Must follow valid email format)
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    // Course enrolled by student (Cannot be empty or whitespace)
    @NotBlank(message = "Course is required and cannot be blank")
    private String course;

    /**
     * Default No-Argument Constructor.
     * Required by Jackson JSON library for deserialization (converting JSON into Java objects).
     */
    public Student() {
    }

    /**
     * Parameterized Constructor without ID.
     * Useful when creating new student objects before an ID is assigned.
     */
    public Student(String name, String email, String course) {
        this.name = name;
        this.email = email;
        this.course = course;
    }

    /**
     * Parameterized Constructor with all fields.
     * Useful when instantiating complete student records.
     */
    public Student(Long id, String name, String email, String course) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
    }

    // ==========================================
    // GETTERS AND SETTERS
    // Encapsulation: Access and modify private fields safely
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    // ==========================================
    // EQUALS, HASHCODE & TOSTRING
    // Helper methods for object comparison and debugging
    // ==========================================

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", course='" + course + '\'' +
                '}';
    }
}
