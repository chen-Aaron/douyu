const Mysql = require('mysql');

const db = require('../config/db');

const Fs = require('fs');

const MyTransform = require('./transform.js');

let myTransform = new MyTransform({ objectMode: true });

myTransform.init('txt');

let mysql = Mysql.createConnection(db);

let sql = `select txt from 9999_2018_04_07 `;

let streams = Fs.createWriteStream('test.txt');

// mysql.query(sql).on('result', (row)=>{
//     console.log(unescape(row['txt']));
// })

mysql.query(sql).stream().pipe(myTransform).pipe(streams).on('finish', (err) => {
    console.log(err);

    mysql.end();
});
