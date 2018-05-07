const douyu = require('../chat/room');

const Times = require('../chat/utils/date');

const Danmu = require('../database/danmu');

const Gift = require('../database/gift');

const db = require('../config/db');

class MyDouYu{

    constructor(roomId, connection){

        this._roomId = roomId

        this._connection = connection;
    
    }

    init(){

        let table = new Times().initializes();

        table = table.replace(/-/g, '_');

        this._table = `${this._roomId}_${table}`;

        this._danmu = new Danmu(this._connection);

        this._gift = new Gift(this._connection);

        this._queue = [];

    }

    // 用户获取用户弹幕提示信息
    getComment(){

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

                            item['gt'] = item['gt'] ? escape(item['gt']) : 0;
                            item['col'] = item['col'] ? escape(item['col']) : 0;
                            item['ct'] = item['ct'] ? escape(item['ct']): 0;
                            item['bnn'] = item['bnn'] ? escape(item['bnn']) : '';
                            item['bl'] = item['bl'] ? escape(item['bl']) : '';
                            item['ic'] = item['ic'] ? escape(item['ic']) : 0;
                            item['brid'] = item['brid'] ? escape(item['brid']) : 0;
                            item['sahf'] = item['sahf'] ? escape(item['sahf']) : '';
                            item['cst'] = item['cst'] ? escape(item['cst']) : '';
                            item['hc'] = item['hc'] ? escape(item['hc']) : '';
                            item['el'] = item['el'] ? escape(item['el']) : '';
                            item['lk'] = item['lk'] ? escape(item['lk']) : '';
                            item['repin'] = item['repin'] ? escape(item['repin']) : '';
                            item['repout'] = item['repout'] ? escape(item['repout']) : '';
                            item['bbm'] = item['bbm'] ? escape(item['bbm']) : '';

                        })

                        that._danmu.insertDb(that._table, queue, (results, fields) => {

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

                            item['gfid'] = item['gfid'] ? escape(item['gfid']) : 0;
                            item['gs'] = item['gs'] ? escape(item['gs']) : 0;
                            item['uid'] = item['uid'] ? escape(item['uid']) : 0;
                            item['bnn'] = item['bnn'] ? escape(item['bnn']) : '';
                            item['nn'] = item['nn'] ? escape(item['nn']) : '';
                            item['ic'] = item['ic'] ? escape(item['ic']) : '';
                            item['brid'] = item['brid'] ? escape(item['brid']) : 0;
                            item['sahf'] = item['sahf'] ? escape(item['sahf']) : '';
                            item['ct'] = item['ct'] ? escape(item['ct']) : 0;
                            item['hc'] = item['hc'] ? escape(item['hc']) : '';
                            item['el'] = item['el'] ? escape(item['el']) : 0;
                            item['hits'] = item['hits'] ? escape(item['hits']) : 0;
                            item['eid'] = item['eid'] ? escape(item['eid']) : 0;
                            item['dw'] = item['dw'] ? escape(item['dw']) : '';
                            item['cm'] = item['cm'] ? escape(item['cm']) : 0;
                            item['bl'] = item['bl'] ? escape(item['bl']) : 0;
                            item['bbm'] = item['bbm'] ? escape(item['bbm']) : '';
                            item['fc'] = item['fc'] ?escape( item['fc']) : '';
                            item['ulevel'] = item['level'] ? escape(item['level']) : 0;

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