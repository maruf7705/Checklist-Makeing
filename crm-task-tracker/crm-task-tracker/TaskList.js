import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask'; // Import AddTask Component
import TaskProgressChart from './TaskProgressChart'; // Import TaskProgressChart Component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter tasks: all, completed, pending
  const [editMode, setEditMode] = useState(false); // To toggle edit mode
  const [taskToEdit, setTaskToEdit] = useState(null); // Store the task being edited
  const [newTaskName, setNewTaskName] = useState(''); // New name for the task being edited

  // Fetch tasks when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Handle task completion
  const toggleTaskCompletion = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { completed: true })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(error => console.error('Error completing task:', error));
  };

  // Handle task deletion
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  // Handle task editing
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

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter tasks based on status (all, completed, pending)
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
  });

  return (
    <div>
      <h2>Task List</h2>
      <AddTask setTasks={setTasks} /> {/* Add New Task Form */}
      <TaskProgressChart tasks={tasks} /> {/* Show Task Completion Chart */}

      <div>
        <label>Filter Tasks:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task._id}>
            <span>{task.name} - {task.completed ? 'Completed' : 'Pending'}</span>
            {!task.completed && (
              <button onClick={() => toggleTaskCompletion(task._id)}>Complete</button> // Complete task button
            )}
            <button onClick={() => handleEditClick(task)}>Edit</button> {/* Edit button */}
            <button onClick={() => deleteTask(task._id)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>

      {/* Edit Task Modal */}
      {editMode && (
        <div>
          <h3>Edit Task</h3>
          <form onSubmit={handleEditSubmit}>
            <input 
              type="text" 
              value={newTaskName} 
              onChange={(e) => setNewTaskName(e.target.value)} 
            />
            <button type="submit">Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;
