const douyu = require('../chat/room');

const Times = require('../chat/utils/date');

const Danmu = require('../database/danmu');

const db = require('../config/db');

class MyDouYu{

    constructor(roomId){

        this._roomId = roomId
    
    }

    init(){

        let table = new Times().initializes();

        table = table.replace(/-/g, '_');

        this._table = `${this._roomId}_${table}`;

        this._danmu = new Danmu(db);

        this._queue = [];

    }

    run(){

        this._danmu.connectDb();

        this._danmu.dealTable(this._table, (status) => {

            if (status) {

                let queue = this._queue;

                let room = new douyu(this._roomId);

                let that = this;

                room.on('chatmsg', function (message) {

                    let time = new Times().getDetail();

                    queue.push(message);

                    if (queue.length > 5) {

                        queue.forEach((item) => {

                            item['gt'] = item['gt'] ? item['gt'] : 0;
                            item['col'] = item['col'] ? item['col'] : 0;
                            item['ct'] = item['ct'] ? item['ct'] : 0;
                            item['bnn'] = item['bnn'] ? item['bnn'] : '';
                            item['bl'] = item['bl'] ? item['bl'] : '';
                            item['ic'] = item['ic'] ? item['ic'] : 0;
                            item['brid'] = item['brid'] ? item['brid'] : 0;
                            item['sahf'] = item['sahf'] ? item['sahf'] : '';
                            item['cst'] = item['cst'] ? item['cst'] : '';
                            item['hc'] = item['hc'] ? item['hc'] : '';
                            item['el'] = item['el'] ? item['el'] : '';
                            item['lk'] = item['lk'] ? item['lk'] : '';
                            item['repin'] = item['repin'] ? item['repin'] : '';
                            item['repout'] = item['repout'] ? item['repout'] : '';
                            item['bbm'] = item['bbm'] ? item['bbm'] : '';

                        })

                        that._danmu.insertDb(that._table, queue, (error, results, fields) => {

                            queue = [];

                        });

                    }

                    let msg = `${that._table}-[${message.nn}]:${message.txt}。[time]:${time}\n`;

                    console.log(msg);

                });

                // Knock, knock ...
                room.open();

            }

        })
    }

}

module.exports = MyDouYu;