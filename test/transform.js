const { Transform } = require('stream');

class MyTransform extends Transform	{
    constructor(Option){
        super(Option)

    }

    init(props){
        this._props = props;
    }

    _transform(chunk, encoding, callback){

        chunk = unescape(chunk[this._props].toString());

        let chunks;

        if (!/[\u4e00-\u9fa5]/.test(chunk)){
            chunks = '';
        } else {
            chunks = chunk;
        }

        callback(null, chunks + '\n');

    }
    
    _flush(callback){

        callback();

    }
}

module.exports = MyTransform;