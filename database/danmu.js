class danmu{

    constructor(connection){

        this._connection = connection;

    }

    // 关闭连接
    closeDb(){

        this._connection.end();
    }

    dealTable(table, callback){

        if(!this.isTableExit(table)){

            this.creatTable(table, (error, results, fields)=>{

                callback(error);

            });

        } else {

            callback(undefined);

        } 



    }


    creatTable(table, callback){

        let sql = `CREATE TABLE \`${table}\` (
                    \`uid\` bigint(20) NOT NULL COMMENT '用户id',
                    \`nn\` varchar(255) NOT NULL COMMENT '用户昵称',
                    \`txt\` text NOT NULL COMMENT '用户弹幕名称',
                    \`cid\` varchar(255) NOT NULL COMMENT '弹幕id',
                    \`ulevel\` int(11) NOT NULL COMMENT '用户等级',
                    \`gt\` int(11) NOT NULL DEFAULT 0 COMMENT '礼物头衔，没有泽默认为0，表示没有头衔',
                    \`col\` int(11) NOT NULL DEFAULT 0 COMMENT '颜色 默讣值 0 没有字段则为 0 表示默讣颜色弹幕',
                    \`ct\` int(11) NOT NULL DEFAULT 0 COMMENT '客户端类型 默讣值 0 没有字段取值 0 表示 web 用户',
                    \`bnn\` varchar(255) NOT NULL COMMENT '粉丝牌子',
                    \`bl\` varchar(255) NOT NULL COMMENT '牌子等级',
                    \`ic\` varchar(255) NOT NULL COMMENT '意义不明',
                    \`brid\` bigint(20) NOT NULL COMMENT '粉丝主播房间id',
                    \`sahf\` varchar(255) NOT NULL,
                    \`cst\` varchar(255) NOT NULL,
                    \`hc\` varchar(255) NOT NULL,
                    \`el\` varchar(255) NOT NULL,
                    \`lk\` varchar(255) NOT NULL,
                    \`repin\` varchar(255) NOT NULL,
                    \`repout\` varchar(255) NOT NULL,
                    \`bbm\` int(11) NOT NULL,
                    \`timestamp\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '弹幕时间',
                    \`id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '记录id',
                    PRIMARY KEY (\`id\`)
                ) ENGINE=\`InnoDB\` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;`
        this._connection.query(sql, callback);
        
    }

    isTableExit(table){

        let sql = `SHOW TABLES LIKE '%${table}%';`


        this._connection.query(sql, (error, results, fields)=>{

            if (results.length !== 0) return true;

            return false;
        })
    }

    // 插入需要的数据
    insertDb(table, list, callback){

        let sql = `insert into ${table} (uid, nn, txt, cid, ulevel, gt, col, ct, bnn, bl, ic, brid, sahf, cst, hc, el, lk, repin, repout, bbm) VALUES `;

        let val = '';
        list.forEach((item)=>{

            val+= `,('${item.uid}', '${item.nn}', '${item.txt}', '${item.cid}', '${item.level}', '${item.gt}', '${item.col}', '${item.ct}', '${item.bnn}', '${item.bl}', '${item.ic}', '${item.brid}', 
                
                '${item.sahf}', '${item.cst}', '${item.hc}', '${item.el}', '${item.lk}', '${item.repin}', '${item.repout}', '${item.bbm}')`;

        });

        val = val.replace(',', '');

        sql+= val;

        this._connection.beginTransaction((err) => {

            if( err ) throw err;

            this._connection.query(sql, (err, results, fields) => {

                if (err) {
                    return this._connection.rollback(function () {
                        throw err;
                    });
                }

                callback(results, fields);

            })

        });

    }

}

module.exports = danmu;