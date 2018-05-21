const Fs = require('fs');

class Clears {

    constructor(){

        this._stopWords = './dict/stop_words_zh.txt';

    }

    load( options ){

        if( options.stopWords )  this._stopWords = options.stopWords;

    }

    getContent(){

        let that = this;

        return new Promise((resolve, reject)=>{

            Fs.readFile(that._stopWords, 'utf-8', (err, data) => {

                if (err) throw err;

                // console.log(that._stopWords);

                let datas = data.toString().replace(/\r/g, '');

                that._Datas = datas.split('\n');

                resolve(that._Datas);

            });

        });

    }

    getData(){

        return this._Datas;

    }

}

// let clears = new Clears();

module.exports = Clears;

// clears.getContent().then((e)=>{console.log(e)});