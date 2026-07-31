import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Activity, 
  Plus, 
  Search, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Info
} from 'lucide-react';
import { studentApi } from './services/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiHealth, setApiHealth] = useState({ online: false, latency: 0 });
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({ id: null, name: '', email: '', course: '' });
  const [modalMode, setModalMode] = useState('ADD'); // 'ADD' or 'EDIT'
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load students & check API health
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const health = await studentApi.checkHealth();
      setApiHealth(health);

      if (health.online) {
        const data = await studentApi.getAllStudents();
        setStudents(data);
      } else {
        setError('Unable to connect to Spring Boot REST API service');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch student data from backend');
      setApiHealth({ online: false, latency: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(async () => {
      const health = await studentApi.checkHealth();
      setApiHealth(health);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Form submit handler (Add / Edit)
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!currentStudent.name || !currentStudent.email || !currentStudent.course) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    try {
      if (modalMode === 'ADD') {
        const created = await studentApi.createStudent({
          name: currentStudent.name,
          email: currentStudent.email,
          course: currentStudent.course
        });
        setStudents([...students, created]);
        showToast(`Student ${created.name} added successfully!`, 'success');
      } else {
        const updated = await studentApi.updateStudent(currentStudent.id, {
          name: currentStudent.name,
          email: currentStudent.email,
          course: currentStudent.course
        });
        setStudents(students.map(s => s.id === updated.id ? updated : s));
        showToast(`Student ${updated.name} updated successfully!`, 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  // Delete student handler
  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await studentApi.deleteStudent(studentToDelete.id);
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      showToast(`Student ${studentToDelete.name} deleted`, 'success');
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    } catch (err) {
      showToast(err.message || 'Failed to delete student', 'error');
    }
  };

  // Filter logic
  const coursesList = ['ALL', ...new Set(students.map(s => s.course))];
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'ALL' || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="app-container">
      
      {/* HEADER BAR */}
      <header className="header-card">
        <div className="brand-section">
          <div className="brand-icon">
            <GraduationCap size={30} />
          </div>
          <div className="brand-title">
            <h1>Student Portal Management</h1>
            <p>Full-Stack React UI &amp; Spring Boot REST API Architecture</p>
          </div>
        </div>

        <div className="status-badge-group">
          <div className="status-pill">
            <span className={`status-indicator ${apiHealth.online ? 'online' : 'offline'}`}></span>
            <span>REST API {apiHealth.online ? 'Online' : 'Offline'}</span>
          </div>
          {apiHealth.online && (
            <div className="status-pill">
              <Activity size={14} style={{ color: '#06b6d4' }} />
              <span>{apiHealth.latency}ms</span>
            </div>
          )}
        </div>
      </header>

      {/* TECH ARCHITECTURE & DATABASE CONFIG BANNER */}
      <div className="tech-banner">
        <div className="tech-banner-left">
          <Database size={20} style={{ color: '#818cf8' }} />
          <div>
            <strong>Database Backend:</strong> In-Memory H2 Database (Active Default)
          </div>
          <span className="badge-tag">Zero-Config H2 DB</span>
        </div>
        <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={16} />
          <span>Switch to MySQL: set <code>spring.profiles.active=mysql</code> in <code>application.properties</code></span>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p>Total Registered Students</p>
            <h2>{students.length}</h2>
          </div>
          <div className="stat-icon-wrapper indigo">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Active Courses</p>
            <h2>{coursesList.length > 1 ? coursesList.length - 1 : 0}</h2>
          </div>
          <div className="stat-icon-wrapper cyan">
            <BookOpen size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Spring Boot Backend</p>
            <h2>{apiHealth.online ? 'Connected' : 'Disconnected'}</h2>
          </div>
          <div className="stat-icon-wrapper emerald">
            <Server size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Database Type</p>
            <h2>H2 / MySQL</h2>
          </div>
          <div className="stat-icon-wrapper amber">
            <Database size={24} />
          </div>
        </div>
      </div>

      {/* ACTION TOOLBAR */}
      <div className="toolbar">
        <div className="search-filter-group">
          <div className="input-with-icon">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by student name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ width: '200px' }}
          >
            {coursesList.map(course => (
              <option key={course} value={course}>
                {course === 'ALL' ? 'All Courses' : course}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={fetchData} title="Refresh Data">
            <RefreshCw size={16} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>

          <button className="btn-primary" onClick={() => {
            setCurrentStudent({ id: null, name: '', email: '', course: '' });
            setModalMode('ADD');
            setIsModalOpen(true);
          }}>
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* ERROR DISPLAY BANNER */}
      {error && (
        <div className="tech-banner" style={{ background: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.4)', marginBottom: '24px' }}>
          <div className="tech-banner-left">
            <AlertCircle size={20} style={{ color: '#fb7185' }} />
            <div style={{ color: '#fecdd3' }}>{error}</div>
          </div>
          <button className="btn-secondary" onClick={fetchData}>Retry Connection</button>
        </div>
      )}

      {/* DATA TABLE */}
      <div className="table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Info</th>
                <th>Email Address</th>
                <th>Enrolled Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <RefreshCw size={28} className="spin" />
                    <p style={{ marginTop: '12px' }}>Connecting to Spring Boot REST API...</p>
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <Users size={36} />
                    <p>No student records found matching your filters.</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>
                      <span className="id-badge">#{student.id}</span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-name">{student.name}</div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {student.email}
                    </td>
                    <td>
                      <span className="course-pill">
                        {student.course}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-icon edit" 
                          title="Edit Student"
                          onClick={() => {
                            setCurrentStudent(student);
                            setModalMode('EDIT');
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="btn-icon delete" 
                          title="Delete Student"
                          onClick={() => {
                            setStudentToDelete(student);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT STUDENT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalMode === 'ADD' ? 'Add New Student' : 'Edit Student Record'}</h3>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmitForm}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. John Doe"
                    value={currentStudent.name}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="e.g. john.doe@example.com"
                    value={currentStudent.email}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Course *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Computer Science"
                    value={currentStudent.course}
                    onChange={(e) => setCurrentStudent({ ...currentStudent, course: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {modalMode === 'ADD' ? 'Save Student' : 'Update Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
              <button className="btn-icon" onClick={() => setIsDeleteModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)' }}>
                Are you sure you want to delete student <strong>{studentToDelete.name}</strong> (#{studentToDelete.id})? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                style={{ background: 'var(--accent-rose)', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)' }}
                onClick={confirmDeleteStudent}
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST FEEDBACK */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? (
              <CheckCircle2 size={20} style={{ color: '#34d399' }} />
            ) : (
              <AlertCircle size={20} style={{ color: '#fb7185' }} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
