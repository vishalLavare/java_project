package com.example.studentmanagement.controller;

import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /students - Should return list of students")
    void testGetAllStudents() throws Exception {
        Student s1 = new Student(1L, "Alice Smith", "alice@example.com", "Computer Science");
        Student s2 = new Student(2L, "Bob Johnson", "bob@example.com", "Data Science");
        List<Student> students = Arrays.asList(s1, s2);

        when(studentService.getAllStudents()).thenReturn(students);

        mockMvc.perform(get("/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Alice Smith")))
                .andExpect(jsonPath("$[1].name", is("Bob Johnson")));

        verify(studentService, times(1)).getAllStudents();
    }

    @Test
    @DisplayName("GET /students/{id} - Should return student when exists")
    void testGetStudentByIdSuccess() throws Exception {
        Student student = new Student(1L, "Alice Smith", "alice@example.com", "Computer Science");

        when(studentService.getStudentById(1L)).thenReturn(student);

        mockMvc.perform(get("/students/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Alice Smith")))
                .andExpect(jsonPath("$.email", is("alice@example.com")))
                .andExpect(jsonPath("$.course", is("Computer Science")));
    }

    @Test
    @DisplayName("GET /students/{id} - Should return 404 when student not found")
    void testGetStudentByIdNotFound() throws Exception {
        when(studentService.getStudentById(99L))
                .thenThrow(new ResourceNotFoundException("Student not found with id: 99"));

        mockMvc.perform(get("/students/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /students - Should create student on valid request")
    void testCreateStudentSuccess() throws Exception {
        Student input = new Student("New Student", "new@example.com", "AI Engineering");
        Student created = new Student(1L, "New Student", "new@example.com", "AI Engineering");

        when(studentService.createStudent(any(Student.class))).thenReturn(created);

        mockMvc.perform(post("/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("New Student")))
                .andExpect(jsonPath("$.email", is("new@example.com")));
    }

    @Test
    @DisplayName("POST /students - Should return 400 Bad Request on invalid email")
    void testCreateStudentValidationError() throws Exception {
        Student invalid = new Student("", "not-an-email", "");

        mockMvc.perform(post("/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("PUT /students/{id} - Should update student successfully")
    void testUpdateStudentSuccess() throws Exception {
        Student updatedInput = new Student("Updated Name", "updated@example.com", "Software Engineering");
        Student updatedResult = new Student(1L, "Updated Name", "updated@example.com", "Software Engineering");

        when(studentService.updateStudent(eq(1L), any(Student.class))).thenReturn(updatedResult);

        mockMvc.perform(put("/students/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedInput)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Updated Name")))
                .andExpect(jsonPath("$.email", is("updated@example.com")));
    }

    @Test
    @DisplayName("DELETE /students/{id} - Should return 204 No Content")
    void testDeleteStudentSuccess() throws Exception {
        doNothing().when(studentService).deleteStudent(1L);

        mockMvc.perform(delete("/students/1"))
                .andExpect(status().isNoContent());

        verify(studentService, times(1)).deleteStudent(1L);
    }
}
