import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import advisor from '../assets/images/advisor.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function Advisor() {

    const [sId, setSId] = useState('');
    const [iId, setIId] = useState('');
    const [advisorList, setAdvisorList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/advisor/api/get').then((response) => {
            console.log(response.data);
            setAdvisorList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/advisor/api/insert', {
            sId: sId, 
            iId: iId,            
        });

        setAdvisorList([
            ...advisorList, 
            {sId: sId, iId: iId,},
        ]);
    };

    const deleteDetails = (sId) => {
        Axios.delete(`http://localhost:3001/advisor/api/delete/${sId}`);
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
                    backgroundImage: `url(${advisor})`,
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

                        <h2 className='pagetitle'>Advisor Details</h2>  
                        
                        <Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="sId"
                                label="Student ID"
                                id="sId"
                                autoFocus
                                onChange={(e) => {
                                    setSId(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="iId"
                                label="Instructor ID"
                                id="iId"
                                autoFocus
                                onChange={(e) => {
                                    setIId(e.target.value);
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
                                    <th>Student ID</th>
                                    <th>Instructor ID</th>
                                    <th>Sure?</th>
                                </tr>
                                {advisorList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.sID}</td>
                                            <td>{val.iID}</td>
                                            <td>
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => {deleteDetails(val.sID);}}
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