package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * StudentController Class
 * REST Controller exposing API endpoints for CRUD operations on Students.
 * Annotations explained:
 * - @RestController: Combines @Controller and @ResponseBody. Converts return values directly into JSON.
 * - @RequestMapping("/students"): Defines base URL path for all endpoints in this controller.
 */
@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {

    // Dependency Injection of Service layer
    private final StudentService studentService;

    /**
     * Constructor Injection (Spring Best Practice).
     * Spring automatically injects the StudentService bean into this controller.
     */
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * 1. GET ALL STUDENTS
     * Endpoint: GET /students
     * Description: Retrieves the list of all registered students.
     * Response: HTTP 200 OK with JSON array of students.
     */
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    /**
     * 2. GET STUDENT BY ID
     * Endpoint: GET /students/{id}
     * Description: Retrieves a single student by unique ID.
     * Response: HTTP 200 OK with Student JSON, or HTTP 404 Not Found if ID does not exist.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    /**
     * 3. CREATE NEW STUDENT
     * Endpoint: POST /students
     * Description: Creates a new student record.
     * Annotations:
     * - @Valid: Triggers field validations defined in Student model class.
     * - @RequestBody: Deserializes JSON payload from HTTP request body into Student Java object.
     * Response: HTTP 201 Created with created Student JSON object.
     */
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        Student createdStudent = studentService.createStudent(student);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    /**
     * 4. UPDATE EXISTING STUDENT
     * Endpoint: PUT /students/{id}
     * Description: Updates student information for the specified ID.
     * Response: HTTP 200 OK with updated Student JSON object.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student studentDetails) {
        Student updatedStudent = studentService.updateStudent(id, studentDetails);
        return ResponseEntity.ok(updatedStudent);
    }

    /**
     * 5. DELETE STUDENT
     * Endpoint: DELETE /students/{id}
     * Description: Removes student with the specified ID.
     * Response: HTTP 204 No Content indicating successful deletion with empty response body.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
