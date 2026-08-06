import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App';
import { studentApi } from './services/api';

// Mock the API module
vi.mock('./services/api', () => ({
  studentApi: {
    checkHealth: vi.fn(),
    getAllStudents: vi.fn(),
    createStudent: vi.fn(),
    updateStudent: vi.fn(),
    deleteStudent: vi.fn(),
  },
}));

describe('Frontend Component Tests - App.jsx', () => {
  const mockStudents = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', course: 'Computer Science' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', course: 'Data Science' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    studentApi.checkHealth.mockResolvedValue({ online: true, latency: 25 });
    studentApi.getAllStudents.mockResolvedValue(mockStudents);
  });

  it('renders student dashboard header and initial student list', async () => {
    render(<App />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    expect(screen.getByText('Student Portal Management')).toBeInTheDocument();
    expect(screen.getAllByText('Computer Science').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Data Science').length).toBeGreaterThan(0);
  });

  it('filters students based on search input query', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search by student name or email/i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });

  it('opens add student modal when click Add Student button', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add student/i });
    fireEvent.click(addButton);

    expect(screen.getByText('Add New Student')).toBeInTheDocument();
  });

  it('displays API error state when backend health check fails', async () => {
    studentApi.checkHealth.mockResolvedValue({ online: false, latency: 0 });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/unable to connect to spring boot rest api service/i)).toBeInTheDocument();
    });
  });
});
