import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import course from '../assets/images/course.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function Course() {

    const [courseId, setCourseId] = useState('');
    const [title, setTitle] = useState('');
    const [departmentName, setdepartmentName] = useState('');
    const [credits, setCredits] = useState('');
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/course/api/get').then((response) => {
            console.log(response.data);
            setCourseList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/course/api/insert', {
            courseId: courseId, 
            title: title, 
            departmentName: departmentName,
            credits: credits,
        });

        setCourseList([
            ...courseList, 
            {courseId: courseId, title: title, departmentName: departmentName, credits: credits,},
        ]);
    };

    const deleteDetails = (id) => {
        Axios.delete(`http://localhost:3001/course/api/delete/${id}`);
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
                    backgroundImage: `url(${course})`,
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

                        <h2 className='pagetitle'>Course Details</h2>  
                        
                        <Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="courseId"
                                label="Course ID"
                                id="courseId"
                                autoFocus
                                onChange={(e) => {
                                    setCourseId(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="title"
                                label="Title"
                                id="title"
                                autoFocus
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}   
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="departmentName"
                                label="DepartmentName"
                                id="departmentName"
                                autoFocus
                                onChange={(e) => {
                                    setdepartmentName(e.target.value);
                                }}   
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="credits"
                                label="Credits"
                                id="credits"
                                autoFocus
                                onChange={(e) => {
                                    setCredits(e.target.value);
                                }}   
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={submitDetails}
                            >
                                Save
                            </Button> 

                            <table className='table'>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Title</th>
                                    <th>Department Name</th>
                                    <th>Credits</th>
                                    <th>Sure?</th>
                                </tr>
                                {courseList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.course_id}</td>
                                            <td>{val.title}</td>
                                            <td>{val.dept_name}</td>
                                            <td>{val.credits}</td>
                                            <td>
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => {deleteDetails(val.course_id);}}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>     
                                    );
                                })} 
                            </table>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}