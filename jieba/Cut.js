const { Transform } = require('stream');
const nodejieba = require("nodejieba");
nodejieba.load({ userDict: './dict/yyf.txt'});
class Cut extends Transform {
    constructor(Option) {

        super(Option)

    }

    _transform(chunk, encoding, callback) {

        chunk = chunk.toString().replace(/[\n\[\]\s]/g, '');

        chunk = unescape(chunk);

        chunk = nodejieba.cut(chunk);

        chunk = chunk.join(',');

        // chunk = JSON.stringify(chunk);

        callback(null, chunk);

    }

    _flush(callback) {

        callback();

    }
}

module.exports = Cut;