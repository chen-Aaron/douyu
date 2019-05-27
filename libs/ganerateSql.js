module.exports = {
    isTableExit(db, table){

        return db.query(`SELECT table_name FROM information_schema.TABLES WHERE table_name = '${table}'`);

    },

    createTable( db, table ){

        let sql = `CREATE TABLE '${table}' (
                    'type' varchar(255) DEFAULT NULL COMMENT '弹幕类型',
                    'rid' int(11) DEFAULT NULL COMMENT '房间号',
                    'uid' int(11) DEFAULT NULL COMMENT '用户id',
                    'nn' varchar(255) DEFAULT NULL COMMENT '用户昵称',
                    'txt' varchar(255) DEFAULT NULL COMMENT '弹幕内容',
                    'cid' varchar(0) DEFAULT NULL,
                    'ic' varchar(255) DEFAULT NULL,
                    'level' bigint(255) DEFAULT NULL,
                    'sahf' int(255) DEFAULT NULL,
                    'cst' varchar(255) DEFAULT NULL,
                    'bnn' varchar(255) DEFAULT NULL,
                    'bl' bigint(255) DEFAULT NULL,
                    'brid' bigint(20) DEFAULT NULL,
                    'hc' varchar(255) DEFAULT NULL,
                    'el' varchar(255) DEFAULT NULL,
                    'lk' varchar(255) DEFAULT NULL,
                    'id' bigint(20) NOT NULL AUTO_INCREMENT,
                     PRIMARY KEY ('id')
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

        return db.query(sql);


    }
}