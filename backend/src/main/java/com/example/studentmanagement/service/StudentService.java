package com.example.studentmanagement.service;

import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * StudentService Class
 * Business logic layer for Student operations backed by Spring Data JPA Repository.
 * Works seamlessly with both In-Memory H2 and MySQL databases.
 */
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Seeds initial sample data into the database if empty upon startup.
     */
    @PostConstruct
    public void initSampleData() {
        if (studentRepository.count() == 0) {
            studentRepository.save(new Student("Alice Smith", "alice.smith@example.com", "Computer Science"));
            studentRepository.save(new Student("Bob Johnson", "bob.johnson@example.com", "Data Science"));
            studentRepository.save(new Student("Charlie Brown", "charlie.brown@example.com", "Software Engineering"));
            studentRepository.save(new Student("Diana Prince", "diana.prince@example.com", "Cyber Security"));
        }
    }

    /**
     * Retrieve all students from the database.
     */
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Retrieve a student by ID.
     */
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    /**
     * Create and persist a new student record.
     */
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    /**
     * Update an existing student's details in the database.
     */
    public Student updateStudent(Long id, Student updatedDetails) {
        Student existingStudent = getStudentById(id);
        existingStudent.setName(updatedDetails.getName());
        existingStudent.setEmail(updatedDetails.getEmail());
        existingStudent.setCourse(updatedDetails.getCourse());
        return studentRepository.save(existingStudent);
    }

    /**
     * Delete a student record by ID from the database.
     */
    public void deleteStudent(Long id) {
        Student existingStudent = getStudentById(id);
        studentRepository.delete(existingStudent);
    }
}
