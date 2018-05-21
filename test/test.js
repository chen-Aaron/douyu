const Mysql = require('mysql');

const db = require('../config/db');

const Fs = require('fs');

const MyTransform = require('./transform.js');

let myTransform = new MyTransform({ objectMode: true });

myTransform.init('txt');

let mysql = Mysql.createConnection(db);

let sql = `select txt from 52876_2018_04_08`;

let streams = Fs.createWriteStream('./test/test.txt');

myTransform.setEncoding('utf-8');

// mysql.query(sql).on('result', (row)=>{
//     console.log(unescape(row['txt']));
// })

mysql.query(sql).stream().pipe(myTransform).pipe(streams).on('finish', (err) => {
    console.log(err);

    mysql.end();
});
