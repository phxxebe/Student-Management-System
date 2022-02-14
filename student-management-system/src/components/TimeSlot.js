import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import timeslot from '../assets/images/timeslot.jpg';
import Axios from 'axios';

import '../App.css';

const theme = createTheme();

export default function TimeSlot() {

    const [timeSlotId, setTimeSlotId] = useState('');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeSlotList, setTimeSlotList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/timeslot/api/get').then((response) => {
            console.log(response.data);
            setTimeSlotList(response.data);
        });
    }, []);

    const submitDetails = () => {
        Axios.post('http://localhost:3001/timeslot/api/insert', {
            timeSlotId: timeSlotId,
            day: day,
            startTime: startTime,
            endTime: endTime,
        });

        setTimeSlotList([
            ...timeSlotList, 
            {timeSlotId: timeSlotId, day: day, startTime: startTime, endTime: endTime,},
        ]);
    };

    const deleteDetails = (timeSlotId) => {
        Axios.delete(`http://localhost:3001/timeslot/api/delete/${timeSlotId}`);
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
                    backgroundImage: `url(${timeslot})`,
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

                        <h2 className='pagetitle'>Time Slots</h2>  
                        
                        <Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="timeSlotId"
                                label="Time Slot ID"
                                id="timeSlotId"
                                autoFocus
                                onChange={(e) => {
                                    setTimeSlotId(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="day"
                                label="Day"
                                id="day"
                                autoFocus
                                onChange={(e) => {
                                    setDay(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="startTime"
                                label="Start Time"
                                id="startTime"
                                autoFocus
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                }}      
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="endTime"
                                label="End Time"
                                id="endTime"
                                autoFocus
                                onChange={(e) => {
                                    setEndTime(e.target.value);
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
                                    <th>Time Slot ID</th>
                                    <th>Day</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Sure?</th>
                                </tr>
                                {timeSlotList.map((val) => {
                                    return (
                                        <tr>
                                            <td>{val.time_slot_id}</td>
                                            <td>{val.day}</td>
                                            <td>{val.start_time}</td>
                                            <td>{val.end_time}</td>
                                            <td>
                                                <Button
                                                    variant="contained" 
                                                    onClick={() => {deleteDetails(val.time_slot_id);}}
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