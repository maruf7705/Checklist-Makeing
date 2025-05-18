import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from './App'; // Ensure context is imported

const TaskList = () => {
  const { tasks, setTasks } = useContext(TaskContext); // Access tasks from context

  useEffect(() => {
    // Fetch tasks
    // ... your API call here
  }, [setTasks]);

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>{task.name}</div>
      ))}
    </div>
  );
};

export default TaskList;
