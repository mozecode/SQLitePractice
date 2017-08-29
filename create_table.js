"use strict";
const sqlite3 = require('sqlite3').verbose();

module.exports=()=>{
//wrap in a promise so we know we'll have table before we do anything with it.
    return new Promise((resolve, reject)=>{
        const db = new sqlite3.Database('business.sqlite', (err)=>{
            if (err){
                console.log("ERROR")
            }
            db.run('DROP TABLE IF EXISTS employees');
            db.run("CREATE TABLE IF NOT EXISTS employees(id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)");
            console.log("table made? YES!");
            resolve();
        });
    })
};
