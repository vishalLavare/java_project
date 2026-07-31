package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * StudentRepository Interface
 * Spring Data JPA Repository providing standard database CRUD operations (save, findAll, findById, deleteById)
 * for the Student entity without needing manual SQL boilerplate.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
