const child_process = require('child_process');

const queue = ['507882', '9999'];

const MyDouYu = require('./src/index.js');

const mysql = require('mysql');

const db = require('./config/db');

const connect = mysql.createConnection(db);


let list = new MyDouYu(9999, connect);
list.init();
list.getComment();
// queue.forEach((item)=>{

//     var workerProcess = child_process.fork('examples/usage.js', [item]);

//     workerProcess.on('close', function (code) {
//         console.log('子进程已退出，退出码 ' + code);
//     });

// });

