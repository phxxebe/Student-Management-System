import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import classroom from '../assets/images/classroom.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function Classroom() {

    const [building, setBuilding] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [classroomList, setClassroomList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/classroom/api/get').then((response) => {
            console.log(response.data);
            setClassroomList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/classroom/api/insert', {
            building: building, 
            roomNumber: roomNumber, 
            capacity: capacity,
        });

        setClassroomList([
            ...classroomList, 
            {building: building, roomNumber: roomNumber, capacity: capacity},
        ]);
    };

    const deleteDetails = (room) => {
        Axios.delete(`http://localhost:3001/classroom/api/delete/${room}`);
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
                    backgroundImage: `url(${classroom})`,
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

                        <h2 className='pagetitle'>Class Room Details</h2>  
                        
                        <Box>

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
                                name="roomnumber"
                                label="Room Number"
                                id="roomnumber"
                                autoFocus
                                onChange={(e) => {
                                    setRoomNumber(e.target.value);
                                }}   
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="capacity"
                                label="Capacity"
                                id="capacity"
                                autoFocus
                                onChange={(e) => {
                                    setCapacity(e.target.value);
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
                                    <th>Building</th>
                                    <th>Room No.</th>
                                    <th>Capacity</th>
                                    <th>Sure?</th>
                                </tr>
                                {classroomList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.building}</td>
                                            <td>{val.room_number}</td>
                                            <td>{val.capacity}</td>
                                            <td>
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => {deleteDetails(val.room_number);}}
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