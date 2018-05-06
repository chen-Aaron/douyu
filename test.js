const child_process = require('child_process');

const queue = ['507882', '9999'];

queue.forEach((item)=>{

    var workerProcess = child_process.fork('examples/usage.js', [item]);

    workerProcess.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code);
    });

});

