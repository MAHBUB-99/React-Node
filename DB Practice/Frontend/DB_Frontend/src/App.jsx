import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for the student form
const StudentForm = ({ newStudent, setNewStudent, handleSubmit, isEditing }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="ID"
      value={newStudent.id}
      onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Name"
      value={newStudent.name}
      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Roll No"
      value={newStudent.roll_no}
      onChange={(e) => setNewStudent({ ...newStudent, roll_no: e.target.value })}
      required
    />
    <input
      type="number"
      placeholder="Fees"
      value={newStudent.fees}
      onChange={(e) => setNewStudent({ ...newStudent, fees: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Class"
      value={newStudent.class}
      onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Medium"
      value={newStudent.medium}
      onChange={(e) => setNewStudent({ ...newStudent, medium: e.target.value })}
      required
    />
    <button type="submit">{isEditing ? 'Update Student' : 'Add Student'}</button>
  </form>
);

// Component for individual student item
const StudentItem = ({ student, deleteStudent, editStudent }) => (
  <li>
    {student.NAME} - {student.ROLL_NO} - {student.CLASS} - {student.MEDIUM}
    <button onClick={() => deleteStudent(student.ID)}>Delete</button>
    <button onClick={() => editStudent(student)}>Edit</button>
  </li>
);

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    roll_no: '',
    fees: '',
    class: '',
    medium: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Fetch students from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/students');
      setStudents(response.data);
    } catch (error) {
      setError("Error fetching students.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add a new student
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/students', newStudent);
      setNewStudent({ id: '', name: '', roll_no: '', fees: '', class: '', medium: '' });  // Clear form
      fetchStudents();
    } catch (error) {
      setError("Error adding student.");
    }
  };

  // Update student information
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/students/${newStudent.id}`, newStudent);
      setNewStudent({ id: '', name: '', roll_no: '', fees: '', class: '', medium: '' });  // Clear form
      setIsEditing(false);
      fetchStudents();
    } catch (error) {
      setError("Error updating student.");
    }
  };

  // Delete a student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      fetchStudents();
    } catch (error) {
      setError("Error deleting student.");
    }
  };

  // Set up form for editing
  const editStudent = (student) => {
    setNewStudent({
      id: student.ID,
      name: student.NAME,
      roll_no: student.ROLL_NO,
      fees: student.FEES,
      class: student.CLASS,
      medium: student.MEDIUM
    });
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Student Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>
      <StudentForm
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        handleSubmit={isEditing ? updateStudent : addStudent}
        isEditing={isEditing}
      />

      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <StudentItem
            key={student.ID}
            student={student}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
