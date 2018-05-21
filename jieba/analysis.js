class Analysis {

    constructor(){
        
        this._counter = {};

        this._Data = [];

    }

    count( id ){

        if (this._counter[id] === undefined ){
            
            this._counter[id] = 1;

        } else {
        
            this._counter[id]++;

        }

    }

    getResult(){

        return JSON.stringify( this._counter );

    }


    generateChartsData(){

        let counter = this._counter;

        let list = Object.keys(counter);

        this._Data = [];

        let Datas = this._Data;

        let data;

        list.forEach((item)=>{
        
            data = {
                name: item,
                value: counter[item]
            }

            Datas.push(data);

        });

        return Datas;

    }

}

module.exports = Analysis;