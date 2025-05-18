import React from 'react';
import TaskList from './TaskList'; // Importing TaskList Component

const App = () => {
  return (
    <div className="App">
      <h1> Maruf Task Tracker CRM</h1> {/* Add a title */}
      <TaskList /> {/* Render the TaskList Component */}
    </div>
  );
}

export default App;
