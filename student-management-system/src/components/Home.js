import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundimage from '../assets/images/backgroundimage.jpg';

const theme = createTheme();

export default function Home() {

  const navigate = useNavigate();
  const submitClassroom = () => {
    navigate('/classroom');
  };

  const submitDepartment = () => {
    navigate('/department');
  };

  const submitCourse = () => {
    navigate('/course');
  };

  const submitInstructor = () => {
    navigate('/instructor');
  };

  const submitSection = () => {
    navigate('/section');
  };

  const submitTeaches = () => {
    navigate('/teaches');
  };

  const submitStudent = () => {
    navigate('/student');
  };

  const submitTakes = () => {
    navigate('/takes');
  };

  const submitAdvisor = () => {
    navigate('/advisor');
  };

  const submitTimeSlot = () => {
    navigate('/timeslot');
  };

  const submitPrerequsite = () => {
    navigate('/prereq');
  };


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <h1>Welcome!</h1>  
            
            <Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitClassroom}
              >
                Class Rooms
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitDepartment}
              >
                Departments
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitCourse}
              >
                Courses
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitInstructor}
              >
                Instructors
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitSection}
              >
                Sections
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitTeaches}
              >
                Instructors Teaching Courses
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitStudent}
              >
                Students
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitTakes}
              >
                Students Taking Courses
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitAdvisor}
              >
                Advisors
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitTimeSlot}
              >
                Time Slots
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submitPrerequsite}
              >
                Prerequisite Courses
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}