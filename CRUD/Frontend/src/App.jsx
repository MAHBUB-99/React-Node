import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [oldName, setOldName] = useState('');
  const [newName, setNewName] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch names and results from the backend when the component mounts
  useEffect(() => {
    fetchNames();
  }, []);

  // Fetch names from the server
  const fetchNames = async () => {
    try {
      const response = await axios.get('http://localhost:3000');
      setNamesList(response.data.array);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Add a new name and result to the list
  const addName = async () => {
    if (name && result) {
      try {
        await axios.post('http://localhost:3000/create', { name, result });
        fetchNames();
        setMessage(`${name} with result ${result} added successfully!`);
        setName('');
        setResult('');
      } catch (error) {
        console.error('Error adding name:', error);
      }
    } else {
      setMessage('Please enter both a name and a result.');
    }
  };

  // Update an existing name
  const updateName = async () => {
    if (oldName && newName) {
      try {
        await axios.put('http://localhost:3000/update', { oldName, newName });
        fetchNames();
        setMessage(`Name updated from ${oldName} to ${newName}`);
        setOldName('');
        setNewName('');
      } catch (error) {
        console.error('Error updating name:', error);
      }
    } else {
      setMessage('Please provide both old and new names.');
    }
  };

  // Delete a name from the list
  const deleteName = async (nameToDelete) => {
    try {
      await axios.delete('http://localhost:3000/delete', { data: { name: nameToDelete } });
      fetchNames();
      setMessage(`${nameToDelete} was deleted successfully!`);
    } catch (error) {
      console.error('Error deleting name:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Results</h1>
      {message && <p style={styles.message}>{message}</p>}

      {/* Add name and result section */}
      <div style={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="number"
          placeholder="Enter result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          style={styles.inputField}
        />
        <button onClick={addName} style={styles.button}>Add Student</button>
      </div>

      {/* Update name section */}
      <div style={styles.inputSection}>
        <input
          type="text"
          placeholder="Old name"
          value={oldName}
          onChange={(e) => setOldName(e.target.value)}
          style={styles.inputField}
        />
        <input
          type="text"
          placeholder="New name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={styles.inputField}
        />
        <button onClick={updateName} style={styles.button}>Update Name</button>
      </div>

      {/* Names List */}
      <div style={styles.namesList}>
        <h2 style={styles.subHeader}>Student Results List</h2>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Result</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {namesList.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{item.name}</td>
                <td style={styles.tableCell}>{item.result}</td>
                <td style={styles.tableCell}>
                  <button
                    onClick={() => deleteName(item.name)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#00796b',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    color: '#d32f2f',
    fontSize: '1.1rem',
    marginBottom: '20px',
  },
  inputSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  inputField: {
    width: '45%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
  },
  button: {
    width: '20%',
    padding: '10px 15px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
  },
  namesList: {
    marginTop: '30px',
  },
  subHeader: {
    textAlign: 'center',
    color: '#00796b',
    fontSize: '1.5rem',
    marginBottom: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#00796b',
    color: '#fff',
  },
  tableHeaderCell: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '1.1rem',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '12px',
    fontSize: '1rem',
    textAlign: 'left',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
