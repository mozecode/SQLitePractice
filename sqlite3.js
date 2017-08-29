"use strict";
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('business.sqlite', (err)=>{
    if (err){
        console.log("ERROR")
    }
    console.log("connected main");
    require('./create_table')()//make sure you have the table in the db
    .then(()=>fillEmpTable())   //then fill it with info
    .then(()=>doQueries())  //then work with the data once you make sure it's there
});

const fillEmpTable=()=>{
    //require in json file by getting the value of the property employeelist array from json file
    const {employeelist}= require('./employees.json');
    employeelist.forEach((employee)=>{
        //flip through each employee and insert into employees table
        // the information from each object in the array
        db.run(`INSERT INTO employees VALUES(${employee.id}, "${employee.firstName}", "${employee.lastName}", "${employee.jobTitle}", "${employee.address}")`);
        //don't forget quotation marks around text items

    })
};

const doQueries=()=>{
// Write a statement to query the database and console.log() all employee records.
    db.all('SELECT * FROM employees', (err, allInfo)=>{
        if(err){
            return console.log(err.toString());
        }
        console.log(allInfo);
    });
// Write a statement to query the database and console.log() each employees jobTitle.
    db.each('SELECT * FROM employees', (err, {id, firstName, lastName, jobTitle, address})=>{
        if(err){
            console.log("Sorry, no dice.");
        }
        console.log(`${firstName} ${lastName}'s job title is ${jobTitle}.`)
    });

// Write a statement to query the database and console.log() each employees firstName, lastName and address only.
    db.each('SELECT * FROM employees', (err, {id, firstName, lastName, jobTitle, address})=>{
        if(err){
            console.log("No luck.");
        }
        console.log(`${firstName} ${lastName}'s address is ${address}.`)
    });

//Write a statement that returns all employees of a specified jobTitle.
    db.all('SELECT firstName as "First", lastName as "Last" FROM employees WHERE jobTitle="Companion" ORDER BY lastName', (err, allInfo)=>{
        console.log(allInfo);
    });

};









