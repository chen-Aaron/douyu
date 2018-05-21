const { Writable } = require('stream');
const nodejieba = require("nodejieba");

class CutWrite extends Writable {
    constructor(Option) {
        super(Option)

        this.data = '';

    }

    _write(chunk, encoding, callback) {

        chunk = nodejieba.cut(chunk.toString());

        chunk = chunk.join(',');

        callback(null, chunk);

    }

    _final(callback) {

        callback();

    }
}

module.exports = CutWrite;