import React from 'react';
import TaskList from './TaskList'; // Importing TaskList Component
import { Container, Typography } from '@mui/material'; // Import Material-UI components

const App = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" sx={{ margin: '20px 0' }}>
        Megal Task Tracker CRM
      </Typography>
      <TaskList /> {/* Render TaskList Component */}
    </Container>
  );
}

export default App;
