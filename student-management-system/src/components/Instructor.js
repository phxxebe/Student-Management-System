import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import instructor from '../assets/images/instructor.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function Instructor() {

    const [Id, setId] = useState('');
    const [name, setName] = useState('');
    const [departmentName, setdepartmentName] = useState('');
    const [salary, setSalary] = useState('');
    const [instructorList, setInstructorList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/instructor/api/get').then((response) => {
            console.log(response.data);
            setInstructorList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/instructor/api/insert', {
            Id: Id, 
            name: name, 
            departmentName: departmentName,
            salary: salary,
        });

        setInstructorList([
            ...instructorList, 
            {Id: Id, name: name, departmentName: departmentName, salary: salary,},
        ]);
    };

    const deleteDetails = (id) => {
        Axios.delete(`http://localhost:3001/instructor/api/delete/${id}`);
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
                    backgroundImage: `url(${instructor})`,
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

                        <h2 className='pagetitle'>Instructor Details</h2>  
                        
                        <Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Id"
                                label="ID"
                                id="Id"
                                autoFocus
                                onChange={(e) => {
                                    setId(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                id="name"
                                autoFocus
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}   
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="departmentName"
                                label="Department Name"
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
                                name="salary"
                                label="Salary"
                                id="salary"
                                autoFocus
                                onChange={(e) => {
                                    setSalary(e.target.value);
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
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Department Name</th>
                                    <th>Salary</th>
                                    <th>Sure?</th>
                                </tr>
                                {instructorList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.ID}</td>
                                            <td>{val.name}</td>
                                            <td>{val.dept_name}</td>
                                            <td>{val.salary}</td>
                                            <td>
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => {deleteDetails(val.ID);}}
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