const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const connection = require('./database');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// classroom
app.get('/classroom/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM classroom;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/classroom/api/insert', function(req, res){

    const building = req.body.building;
    const roomNumber = req.body.roomNumber;
    const capacity = req.body.capacity;

    const sqlInsert = "INSERT INTO classroom (building, room_number, capacity) VALUES (?,?,?);";
    connection.query(sqlInsert, [building, roomNumber, capacity], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/classroom/api/delete/:roomNumber', function(req, res){
    const roomNumber = req.params.roomNumber;

    const sqlDelete = "DELETE FROM classroom WHERE room_number = ?;";
    connection.query(sqlDelete, roomNumber, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end classroom

// department
app.get('/department/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM department;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/department/api/insert', function(req, res){

    const departmentName = req.body.departmentName;
    const building = req.body.building;
    const budget = req.body.budget;

    const sqlInsert = "INSERT INTO department (dept_name, building, budget) VALUES (?,?,?);";
    connection.query(sqlInsert, [departmentName, building, budget], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/department/api/delete/:departmentName', function(req, res){
    const departmentName = req.params.departmentName;

    const sqlDelete = "DELETE FROM department WHERE dept_name = ?;";
    connection.query(sqlDelete, departmentName, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end department

// course
app.get('/course/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM course;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/course/api/insert', function(req, res){

    const courseId = req.body.courseId;
    const title = req.body.title;
    const departmentName = req.body.departmentName;
    const credits = req.body.credits;

    const sqlInsert = "INSERT INTO course (course_id, title, dept_name, credits) VALUES (?,?,?,?);";
    connection.query(sqlInsert, [courseId, title, departmentName, credits], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/course/api/delete/:courseId', function(req, res){
    const courseId = req.params.courseId;

    const sqlDelete = "DELETE FROM course WHERE course_id = ?;";
    connection.query(sqlDelete, courseId, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end course

// instructor
app.get('/instructor/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM instructor;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/instructor/api/insert', function(req, res){

    const Id = req.body.Id;
    const name = req.body.name;
    const departmentName = req.body.departmentName;
    const salary = req.body.salary;

    const sqlInsert = "INSERT INTO instructor (id, name, dept_name, salary) VALUES (?,?,?,?);";
    connection.query(sqlInsert, [Id, name, departmentName, salary], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/instructor/api/delete/:Id', function(req, res){
    const Id = req.params.Id;

    const sqlDelete = "DELETE FROM instructor WHERE ID = ?;";
    connection.query(sqlDelete, Id, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end instructor

// section
app.get('/section/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM section;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// end section

// teaches
app.get('/teaches/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM teaches;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// end teaches

// student
app.get('/student/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM student;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/student/api/insert', function(req, res){

    const Id = req.body.Id;
    const name = req.body.name;
    const departmentName = req.body.departmentName;
    const totalCredit = req.body.totalCredit;

    const sqlInsert = "INSERT INTO student (id, name, dept_name, tot_cred) VALUES (?,?,?,?);";
    connection.query(sqlInsert, [Id, name, departmentName, totalCredit], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/student/api/delete/:Id', function(req, res){
    const Id = req.params.Id;

    const sqlDelete = "DELETE FROM student WHERE ID = ?;";
    connection.query(sqlDelete, Id, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end student

// takes
app.get('/takes/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM takes;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// end takes

// advisor
app.get('/advisor/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM advisor;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/advisor/api/insert', function(req, res){

    const sId = req.body.sId;
    const iId = req.body.iId;

    const sqlInsert = "INSERT INTO advisor (sID, iID) VALUES (?,?);";
    connection.query(sqlInsert, [sId, iId], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/advisor/api/delete/:sId', function(req, res){
    const sId = req.params.sId;

    const sqlDelete = "DELETE FROM advisor WHERE sID = ?;";
    connection.query(sqlDelete, sId, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end advisor

// timeslot
app.get('/timeslot/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM time_slot;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/timeslot/api/insert', function(req, res){

    const timeSlotId = req.body.timeSlotId;
    const day = req.body.day;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    const sqlInsert = "INSERT INTO time_slot (time_slot_id, day, start_time, end_time) VALUES (?,?,?,?);";
    connection.query(sqlInsert, [timeSlotId, day, startTime, endTime], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/timeslot/api/delete/:timeSlotId', function(req, res){
    const timeSlotId = req.params.timeSlotId;

    const sqlDelete = "DELETE FROM time_slot WHERE time_slot_id = ?;";
    connection.query(sqlDelete, timeSlotId, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end timeslot


// prereq
app.get('/prereq/api/get', function(req, res){

    const sqlSelect = "SELECT * FROM prereq;";
    connection.query(sqlSelect, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/prereq/api/insert', function(req, res){

    const courseId = req.body.courseId;
    const prereqId = req.body.prereqId;

    const sqlInsert = "INSERT INTO prereq (course_id, prereq_id) VALUES (?,?);";
    connection.query(sqlInsert, [courseId, prereqId], (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

app.delete('/prereq/api/delete/:courseId', function(req, res){
    const courseId = req.params.courseId;

    const sqlDelete = "DELETE FROM prereq WHERE course_id = ?;";
    connection.query(sqlDelete, courseId, (err, result) => {
        if(err) throw err;
        console.log(result);
    });
});

// end prereq

app.listen(3001, function(){
    console.log('running on 3001 port');
    connection.connect(function(err){
        if(err) throw err;
        console.log('DB Connected!');
    })
});