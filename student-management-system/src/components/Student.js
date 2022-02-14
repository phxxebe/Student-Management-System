import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import student from '../assets/images/student.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function Student() {

    const [Id, setId] = useState('');
    const [name, setName] = useState('');
    const [departmentName, setdepartmentName] = useState('');
    const [totalCredit, setTotalCredit] = useState('');
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/student/api/get').then((response) => {
            console.log(response.data);
            setStudentList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/student/api/insert', {
            Id: Id, 
            name: name, 
            departmentName: departmentName,
            totalCredit: totalCredit,
        });

        setStudentList([
            ...studentList, 
            {Id: Id, name: name, departmentName: departmentName, totalCredit: totalCredit,},
        ]);
    };

    const deleteDetails = (id) => {
        Axios.delete(`http://localhost:3001/student/api/delete/${id}`);
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
                    backgroundImage: `url(${student})`,
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

                        <h2 className='pagetitle'>Student Details</h2>  
                        
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
                                name="totalCredit"
                                label="Total Credits"
                                id="totalCredit"
                                autoFocus
                                onChange={(e) => {
                                    setTotalCredit(e.target.value);
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
                                    <th>Total Credits</th>
                                    <th>Sure?</th>
                                </tr>
                                {studentList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.ID}</td>
                                            <td>{val.name}</td>
                                            <td>{val.dept_name}</td>
                                            <td>{val.tot_cred}</td>
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