import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import department from '../assets/images/department.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function Department() {

    const [departmentName, setDepartmentName] = useState('');
    const [building, setBuilding] = useState('');
    const [budget, setBudget] = useState('');
    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/department/api/get').then((response) => {
            console.log(response.data);
            setDepartmentList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/department/api/insert', {
            departmentName: departmentName,
            building: building, 
            budget: budget,
        });

        setDepartmentList([
            ...departmentList, 
            {departmentName: departmentName, building: building, budget: budget},
        ]);
    };

    const deleteDetails = (name) => {
        Axios.delete(`http://localhost:3001/department/api/delete/${name}`);
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
                    backgroundImage: `url(${department})`,
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

                        <h2 className='pagetitle'>Department Details</h2>  
                        
                        <Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="department"
                                label="Department"
                                id="department"
                                autoFocus
                                onChange={(e) => {
                                    setDepartmentName(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="building"
                                label="Building"
                                id="building"
                                autoFocus
                                onChange={(e) => {
                                    setBuilding(e.target.value);
                                }}   
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="budget"
                                label="Budget"
                                id="budget"
                                autoFocus
                                onChange={(e) => {
                                    setBudget(e.target.value);
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
                                    <th>Department Name</th>
                                    <th>Building</th>
                                    <th>Budget</th>
                                    <th>Sure?</th>
                                </tr>
                                {departmentList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.dept_name}</td>
                                            <td>{val.building}</td>
                                            <td>{val.budget}</td>
                                            <td>
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => {deleteDetails(val.dept_name);}}
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