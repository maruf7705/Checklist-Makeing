import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, TextField, MenuItem } from '@mui/material'; // Material-UI components
import AddTask from './AddTask'; // Import AddTask Component
import TaskProgressChart from './TaskProgressChart'; // Import TaskProgressChart Component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter tasks: all, completed, pending
  const [editMode, setEditMode] = useState(false); // To toggle edit mode
  const [taskToEdit, setTaskToEdit] = useState(null); // Store the task being edited
  const [newTaskName, setNewTaskName] = useState(''); // New name for the task being edited

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const toggleTaskCompletion = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { completed: true })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(error => console.error('Error completing task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleEditClick = (task) => {
    setEditMode(true);
    setTaskToEdit(task);
    setNewTaskName(task.name);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/tasks/${taskToEdit._id}`, { name: newTaskName })
      .then(response => {
        setTasks(tasks.map(task => task._id === taskToEdit._id ? response.data : task));
        setEditMode(false);
        setTaskToEdit(null);
        setNewTaskName('');
      })
      .catch(error => console.error('Error editing task:', error));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
  });

  return (
    <div>
      <TextField
        select
        label="Filter Tasks"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </TextField>

      <AddTask setTasks={setTasks} /> {/* Add New Task Form */}
      <TaskProgressChart tasks={tasks} /> {/* Show Task Completion Chart */}

      <List>
        {filteredTasks.map(task => (
          <ListItem key={task._id}>
            <ListItemText
              primary={task.name}
              secondary={task.completed ? 'Completed' : 'Pending'}
            />
            {!task.completed && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => toggleTaskCompletion(task._id)}
                style={{ marginRight: '10px' }}
              >
                Complete
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditClick(task)}
              style={{ marginRight: '10px' }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      {editMode && (
        <div>
          <h3>Edit Task</h3>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button onClick={() => setEditMode(false)} variant="outlined" color="default">Cancel</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;
