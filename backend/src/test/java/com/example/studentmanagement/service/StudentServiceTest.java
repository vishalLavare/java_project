package com.example.studentmanagement.service;

import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student sampleStudent;

    @BeforeEach
    void setUp() {
        sampleStudent = new Student(1L, "John Doe", "john.doe@example.com", "Computer Science");
    }

    @Test
    @DisplayName("getAllStudents() - Should return list of all students")
    void testGetAllStudents() {
        List<Student> list = Arrays.asList(sampleStudent);
        when(studentRepository.findAll()).thenReturn(list);

        List<Student> result = studentService.getAllStudents();

        assertEquals(1, result.size());
        assertEquals("John Doe", result.get(0).getName());
        verify(studentRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("getStudentById() - Should return student when found")
    void testGetStudentByIdFound() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(sampleStudent));

        Student result = studentService.getStudentById(1L);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
    }

    @Test
    @DisplayName("getStudentById() - Should throw ResourceNotFoundException when student not found")
    void testGetStudentByIdNotFound() {
        when(studentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> studentService.getStudentById(99L));
    }

    @Test
    @DisplayName("createStudent() - Should save and return new student")
    void testCreateStudent() {
        when(studentRepository.save(any(Student.class))).thenReturn(sampleStudent);

        Student created = studentService.createStudent(sampleStudent);

        assertNotNull(created);
        assertEquals("John Doe", created.getName());
        verify(studentRepository, times(1)).save(sampleStudent);
    }

    @Test
    @DisplayName("deleteStudent() - Should delete existing student")
    void testDeleteStudent() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(sampleStudent));
        doNothing().when(studentRepository).delete(sampleStudent);

        studentService.deleteStudent(1L);

        verify(studentRepository, times(1)).delete(sampleStudent);
    }
}
