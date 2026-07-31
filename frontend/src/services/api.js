const API_URL = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = API_URL ? (API_URL.endsWith('/students') ? API_URL : `${API_URL}/students`) : '/students';

/**
 * Service module for interacting with Spring Boot REST API
 */
export const studentApi = {
  // Fetch all students
  async getAllStudents() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Error fetching students (HTTP ${response.status})`);
    }
    return response.json();
  },

  // Fetch single student by ID
  async getStudentById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Student with ID ${id} not found`);
    }
    return response.json();
  },

  // Create new student record
  async createStudent(studentData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create student (HTTP ${response.status})`);
    }
    return response.json();
  },

  // Update existing student record
  async updateStudent(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update student (HTTP ${response.status})`);
    }
    return response.json();
  },

  // Delete student record
  async deleteStudent(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete student (HTTP ${response.status})`);
    }
    return true;
  },

  // Check health of Spring Boot REST API
  async checkHealth() {
    try {
      const startTime = performance.now();
      const response = await fetch(API_BASE_URL, { method: 'GET' });
      const latency = Math.round(performance.now() - startTime);
      return { online: response.ok, latency };
    } catch {
      return { online: false, latency: 0 };
    }
  }
};
