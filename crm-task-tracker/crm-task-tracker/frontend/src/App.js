import React, { useState, createContext } from 'react';
import TaskList from './TaskList'; // Import TaskList Component
import { Container, Typography } from '@mui/material'; // Material-UI components
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Material-UI ThemeProvider

// Create Context for tasks
export const TaskContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]); // State to manage tasks

  // Create a custom Material-UI theme (optional)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#d32f2f',
      },
    },
  });

  return (
    // Wrap your app with ThemeProvider for Material-UI theme and TaskContext.Provider for context
    <ThemeProvider theme={theme}>
      <TaskContext.Provider value={{ tasks, setTasks }}>
        <Container>
          <Typography variant="h3" align="center" sx={{ margin: '20px 0' }}>
            Megal Task Tracker CRM
          </Typography>
          <TaskList /> {/* Render TaskList Component */}
        </Container>
      </TaskContext.Provider>
    </ThemeProvider>
  );
};

export default App;
