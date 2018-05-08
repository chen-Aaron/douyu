const { Transform } = require('stream');

class MyTransform extends Transform	{
    constructor(Option){
        super(Option)

    }

    init(props){
        this._props = props;
    }

    _transform(chunk, encoding, callback){

        
        callback(null, unescape(chunk[this._props])+'\n');

    }
    
    _flush(callback){

        callback();

    }
}

module.exports = MyTransform;