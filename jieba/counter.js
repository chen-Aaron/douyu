const Fs = require('fs');

const readStream = Fs.createReadStream('./test/cut.txt');

const Analysis = require('../jieba/analysis.js');

const Clear = require('../jieba/clear.js');

let clears = new Clear();

let analysis = new Analysis();

clears.getContent().then((stopWords) => {

    readStream.on('data', (chunk) => {

        let string = chunk.toString();

        let words = string.split(/\s/);

        // console.log(words);

        // 获取每个词语
        words.forEach((item) => {


            if ( stopWords.indexOf(item) < 0 ){

                analysis.count(item);

            }

        });

        // console.log(analysis.generateChartsData());

    });

    readStream.on('end', () => {

        let charts = analysis.generateChartsData();

        charts.sort((a, b) => {

            return b.value - a.value;

        });

        Fs.writeFile('./jieba/yun.js', JSON.stringify(charts.slice(0, 80)), (err) => {

            if (err) console.log('its an error');

            console.log('done')

        })

    })

});

