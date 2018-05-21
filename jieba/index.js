const Fs = require('fs');

const CutStream = require('./Cut.js');

let myTransform = new CutStream();

let readStream = Fs.createReadStream('./test/test.txt');

let writeStream = Fs.createWriteStream('./test/cut.txt');

readStream.pipe(myTransform).pipe(writeStream).on('finish', (err)=>{
    
    if( !err ){

        console.log('finish');

    }

});