const mysql = require('mysql');

class gift {

    constructor(db) {

        this._db = db;

    }

    // 开启连接
    connectDb() {

        this._connection = mysql.createConnection(this._db);

    }

    // 关闭连接
    closeDb() {

        this._connection.end();
    }


    creatTable(table, callback) {

        let sql = `CREATE TABLE ${table} (
                    'gid' bigint(20) NOT NULL COMMENT '礼物id',
                    'gs' int(11) NOT NULL COMMENT '礼物显示样式',
                    'uid' bigint(20) NOT NULL COMMENT '用户id',
                    'nn' varchar(255) NOT NULL COMMENT '用户昵称',
                    'ic' varchar(255) NOT NULL,
                    'eid' int(11) NOT NULL,
                    'level' int(11) NOT NULL COMMENT '用户等级',
                    'dw' bigint(20) NOT NULL COMMENT '主播体重',
                    'hits' int(11) NOT NULL COMMENT '礼物连击次数 默讣值 1 没有字段取值 1 表示 1 连击',
                    'ct' int(11) NOT NULL,
                    'el' int(11) NOT NULL,
                    'cm' int(11) NOT NULL,
                    'bnn' varchar(255) NOT NULL COMMENT '粉丝牌子',
                    'bl' int(11) NOT NULL COMMENT '粉丝牌子等级',
                    'brid' bigint(20) NOT NULL,
                    'hc' varchar(255) NOT NULL,
                    'sahf' varchar(255) NOT NULL,
                    'fc' varchar(255) NOT NULL,
                    'timestamp' datetime NOT NULL COMMENT '礼物发送时间',
                    'id' bigint(20) NOT NULL AUTO_INCREMENT COMMENT '记录id',
                    PRIMARY KEY ('id')
                ) ENGINE= 'InnoDB' AUTO_INCREMENT= 1 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ROW_FORMAT= DYNAMIC COMMENT= '' CHECKSUM= 0 DELAY_KEY_WRITE= 0;`;

        this._connection.query(sql, callback);

    }

    isTableExit(table) {

        let sql = `SHOW TABLES LIKE ' % ${table }%';`


        this._connection.query(sql, (error, results, fields) => {

            if (fields !== null) return true;

            return false;
        })
    }

    insertDb(table, list, callback) {
        let sql = `insert into ${table} (gid, gs, uid, nn, ic, eid, level, dw, hits, ct, el, cm, bnn, bl, brid, hc, sahf, fc) VALUES `;

        let val = '';
        list.forEach((item) => {

            val += `,(${item.gid}, ${item.gs}, ${item.uid}, ${item.nn}, ${item.ic}, ${item.eid}, ${item.level}, ${item.dw}, ${item.hits}, ${item.ct}, ${item.el}, ${item.cm}, 
                
                ${item.bnn}, ${item.bl}, ${item.brid}, ${item.hc}, ${item.sahf}, ${item.fc}`;

        });

        val = val.replace(',', '');

        sql += val;

        this._connection.query(sql, callback);

    }




}

module.exports = gift;