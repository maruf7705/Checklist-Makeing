import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // For generating unique task IDs

const AddTask = ({ setTasks }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return;

    const newTask = {
      _id: uuidv4(), // Unique ID for each task
      name: taskName,
      completed: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setTaskName('');
  };

  return (
    <div>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Add Task</Button>
      </form>
    </div>
  );
};

export default AddTask;
