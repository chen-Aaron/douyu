const douyu = require('../chat/room');

const Times = require('../chat/utils/date');

const Danmu = require('../database/danmu');

const Gift = require('../database/gift');

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

        this._gift = new Gift(db);

        this._queue = [];

    }

    // 用户获取用户弹幕提示信息
    getComment(){

        this._danmu.connectDb();

        this._danmu.dealTable(this._table, (status) => {

            if (status) {

                let queue = this._queue;

                let room = new douyu(this._roomId);

                let that = this;

                room.on('chatmsg', function (message) {

                    let time = new Times().getDetail();

                    queue.push(message);

                    if (queue.length > 20) {

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

    // 用户送出的礼物
    getGift() {

        let table = this._table + '_gift';

        this._gift.connectDb();

        this._gift.dealTable(table, (status) => {

            if (status) {

                let queue = this._queue;

                let room = new douyu(this._roomId);

                let that = this;

                room.on('dgb', function (message) {

                    let time = new Times().getDetail();

                    queue.push(message);

                    if (queue.length > 20) {

                        queue.forEach((item) => {

                            item['gfid'] = item['gfid'] ? item['gfid'] : 0;
                            item['gs'] = item['gs'] ? item['gs'] : 0;
                            item['uid'] = item['uid'] ? item['uid'] : 0;
                            item['bnn'] = item['bnn'] ? item['bnn'] : '';
                            item['nn'] = item['nn'] ? item['nn'] : '';
                            item['ic'] = item['ic'] ? item['ic'] : '';
                            item['brid'] = item['brid'] ? item['brid'] : 0;
                            item['sahf'] = item['sahf'] ? item['sahf'] : '';
                            item['ct'] = item['ct'] ? item['ct'] : 0;
                            item['hc'] = item['hc'] ? item['hc'] : '';
                            item['el'] = item['el'] ? item['el'] : 0;
                            item['hits'] = item['hits'] ? item['hits'] : 0;
                            item['eid'] = item['eid'] ? item['eid'] : '';
                            item['dw'] = item['dw'] ? item['dw'] : '';
                            item['cm'] = item['cm'] ? item['cm'] : 0;
                            item['bl'] = item['bl'] ? item['bl'] : 0;
                            item['bbm'] = item['bbm'] ? item['bbm'] : '';
                            item['fc'] = item['fc'] ? item['fc'] : '';
                            item['ulevel'] = item['level'] ? item['level'] : 0;

                        })

                        that._gift.insertDb(table, queue, (error, results, fields) => {

                            queue = [];

                        });

                    }

                    let msg = `${table}-[${message.nn}]:${message.gfid}。[time]:${time}\n`;

                    console.log(msg);

                });

                // Knock, knock ...
                room.open();

            }

        })
    }


}

module.exports = MyDouYu;