import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Classroom from './components/Classroom';
import Department from './components/Department';
import Course from './components/Course';
import Instructor from './components/Instructor';
import Section from './components/Section';
import Teaches from './components/Teaches';
import Student from './components/Student'
import Takes from './components/Takes';
import Advisor from './components/Advisor';
import TimeSlot from './components/TimeSlot';
import Prereq from './components/Prereq'

import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/classroom' element={<Classroom/>} />
          <Route path='/department' element={<Department/>} />
          <Route path='/course' element={<Course/>} />
          <Route path='/instructor' element={<Instructor/>} />
          <Route path='/section' element={<Section/>} />
          <Route path='/teaches' element={<Teaches/>} />
          <Route path='/student' element={<Student/>} />
          <Route path='/takes' element={<Takes/>} />
          <Route path='/advisor' element={<Advisor/>} />
          <Route path='/timeslot' element={<TimeSlot/>} />
          <Route path='/prereq' element={<Prereq/>} />
          
          <Route path='/' element={<Home/>} />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;