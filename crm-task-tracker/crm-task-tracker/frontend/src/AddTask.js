import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ setTasks }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return;

    // Post new task to backend
    axios.post('http://localhost:5000/tasks', { name: taskName })
      .then(response => {
        // Update tasks list in parent component
        setTasks(prevTasks => [...prevTasks, response.data]);
        setTaskName(''); // Clear input field after submitting
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder="Enter task name" 
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
