const express = require('express');

const app = express();

const fs = require('fs');


const cors = require('cors');
app.use(cors());

const sqlite3= require('sqlite3').verbose();

const db = new sqlite3.Database('../../Users/vaibh/AppData/Local/Google/Chrome/User Data/Default/History',(err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the history database.');
    });

const query = "select url, title, visit_count, last_visit_time from urls;"

let count = 0;
db.all(query,(err, rows) => {
    if(!err) {
        for(let row of rows) {
            // console.log(row.url);
            if(row.url.includes('https://www.google.com/search'))
            {
                count = count + 1;
            }
        }
        console.log("No of searches = ", count);
        console.log("CO2 Emission = ",count*0.2);
    } else {
        console.log(err);
    }
});

app.get('/',(req, res, next) => {
    res.send("<H1>YO</H1>");
});

app.get('/getData', (req, res, next) => {
    res.json({
        count: count,
        co2: count*0.2
    });
});

app.get('/newData', (req, res, next) => {
    fs.copyFileSync("../../users/vaibh/AppData/Local/Google/Chrome/User Data/Default/History", "./history");
    const db = new sqlite3.Database('./History',(err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the copy history database.');
    });

    const query = "select url, title, visit_count, last_visit_time from urls;"

    let count = 0;
    db.all(query,(err, rows) => {
        if(!err) {
            for(let row of rows) {
                // console.log(row.url);
                if(row.url.includes('https://www.google.com/search'))
                {
                    count = count + 1;
                }
            }
            const result = {
                count: count,
                co2: count*0.2
            }
            console.log("No of searches = ", result.count);
            console.log("CO2 Emission = ", result.co2);
            res.json(result); 
        } else {
            console.log(err);
        }
    });

});

app.listen(2244, () => {
    console.log("Server runninng at http://localhost:2244/");
});