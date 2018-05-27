/*
 * @Author: Aaron 
 * @Date: 2018-05-21 09:34:32 
 * @Last Modified by: Aaron
 * @Last Modified time: 2018-05-27 22:39:36
 */
// const Fs = require('fs');

const request = require('request')

const tables = require('../config/index.js');

 class Generation {

    constructor( db, redis){

        this._db = db;

        this._redis = redis;

        this._redisName = '';

        this._path = 'https://yuba.douyu.com/wbapi/web/user/detail/';

        // 获取的用户id列表
        this._list = [];

        // 获取的用户具体信息列表
        this._userList = [];

        // 错误的用户列表
        this._errList = [];

        // 任务列表
        this._queue = [];

        // 一次获取列表内容的次数
        this._time = 10;

        this._tables = tables;

        // this._getUid =  `SELECT uid from 9999_2018_04_09 GROUP BY uid`;

    }

    // 主入口
    run(){

        this._list = []

        this._table = tables.splice(0, 1);

        this._creatTable = this._table + 'redis';

        this._redisName = this._creatTable;

        this._redisErrorName = this._redisName + 'error';

        let list = this._list; 

        let isExit = false;

        let that = this;

        // 先判断是否存在表格
        let query = this.isTableExit(this._creatTable);

        query.on('error', (error) => {

            console.log(error);

        }).on('result', (result)=>{

            isExit = true;

            this.dealUserInfo();

        }).on('end', ()=>{
            
            if(!isExit){

                this.createTable(this._creatTable, (err) => {

                    if (err) throw err;

                    this.getAllUids().on('error', (err) => {

                        throw new Error('its an Error');

                    }).on('result', (result) => {

                        this._list.push(result.uid);

                    }).on('end', () => {

                        this.setList();

                    });

                })

            }
        });
        // if( this.isTableExit(this._table) ){

        //     this.getAllUids().on('error', (err) => {

        //         throw new Error('its an Error');

        //     }).on('result', (result) => {console.log(result)

        //         list.push(result.uid);

        //     }).on('end', () => {

        //         this.setList();

        //     });

        // } else {

        //     this.createTable(this._table, (err) => {

        //         if (err) throw err;

        //         this.getAllUids().on('error', (err) => {

        //             throw new Error('its an Error');

        //         }).on('result', (result) => {

        //             list.push(result.uid);

        //         }).on('end', () => {

        //             this.setList();

        //         });

        //     })

        // }

    }

    // 获取所有的数据表名称
    // getAllTable(){
    //     let that = this;

    //     let sql = `select table_name from information_schema.tables where table_schema='douyu' and table_type='base table'`;

    //     this._db.query(sql, (err, result, field)=>{

    //         if(err) throw err;

    //         result.forEach((item)=>{

    //             if (/gift/.test(item.table_name)){

    //                 that._tables.push(item.table_name)

    //             }

    //         })

    //         Fs.writeFile('tables.js', JSON.stringify(that._tables), (err)=>{

    //             if(err) console.log('err')

    //             console.log('finish')

    //         });

    //     })

    // }

    // getAllTable(){
    //     console.log(this._tables)
    // }

    // 设置列表
    setQueue(userList){
        let queue = [];

        userList.forEach((item)=>{

            queue.push(this.getUserInfo(item));

        });

        return Promise.all(queue);

    }


    // 获取所有的用户id，特指一个表中的所有用户id并不是所有表
    getAllUids(result){
        let table = this._table;

        let sql = `SELECT uid from ${table} GROUP BY uid`;

        return this._db.query(sql);

    }

    getUserInfo(uid){
        let url = this._path + uid;

        return new Promise((resolve, reject)=>{

            request(url, { timeout: 15000 }, (err, res, body)=>{
                
                body = JSON.parse(body)

                if (!err && body.message === 'success'){

                    this._userList.push(body.data);

                    resolve(true);

                } else {

                    resolve(true);

                    this._errList.push(uid);

                }

            })

        })

    }

    // 设置redis列表内容
    setList(){
        let name = this._redisName;

        this._redis.LPUSH(name, this._list.slice(), (err, res)=>{

            console.log(`save ${name}`);
            this.dealUserInfo();

        })

    }

    // 处理用户信息
    dealUserInfo(){

        this.getUserId().then((res)=>{


            this.setQueue(res).then((res=>{

                this.insertData(this._creatTable, this._userList);

                // 处理错误的userId
                if (this._errList.length > 20 ){
                    
                    this.handleErrorUserId();

                }
                
                // 继续处理
                this.dealUserInfo();

            }));


        }).catch((e)=>{

            this.handleError();
            
            console.log(e);

        });


    }

    // insertUserInfo(infos){

    //     let table = this._table;

    //     this.insertData();

    // }

    // 判断数据表是否存在
    isTableExit(table) {

        let sql = `SHOW TABLES LIKE '%${table}%'`;

        return this._db.query(sql);
    }

    // 从redis中获取用户id
    getRedisUids(){
        let name = this._redisName;

        return new Promise((resolve, reject)=>{

            this._redis.BRPOP(name, 1, (err, res) => {

                if (err) return reject(new Error('redis error'));

                if(!res){

                    reject('empty');

                } else {

                    console.log(res)

                    resolve(res[1]);

                }

            })

        })

    }

    // 处理请求错误的userId
    handleErrorUserId(){

        let name = this._redisErrorName;

        this._redis.LPUSH(name, this._errList.slice(), (err, res)=>{

            if( err ) throw err;

            this._errList = [];

        });

    }


    // 处理从redis队列中的错误
    handleError(){

        let name = this._redisName;

        this._redis.LLEN(name, (err, res)=>{

            if (err) reject(new Error('redis error'));

            if( res === 0 ){

                this.run();

            }

        })

    }

    // 设置循环获取用户id
    getUserId(){

        let max = this._time;

        let list = [];

        for(let i=0 ;i < max; i++){

            list.push(this.getRedisUids());

        }

        return Promise.all(list);

    }

    // 生成新数据表
    createTable(table, callback){

        let sql = `CREATE TABLE ${table}(
                    \`uid\` bigint(20) NOT NULL COMMENT '用户id',
                    \`nickname\` varchar(255) NOT NULL COMMENT '用户昵称',
                    \`avatar\` varchar(255) NOT NULL COMMENT '用户头像地址',
                    \`summary\` text NOT NULL COMMENT '用户简介',
                    \`is_follow\` int(11) NOT NULL COMMENT '具体不明确',
                    \`gender\` int(11) NOT NULL DEFAULT 0 COMMENT '用户性别, 0表示 未知, 1表示性别男，2表示性别女',
                    \`group_id\` int(11) NOT NULL DEFAULT 0 COMMENT '颜色 默讣值 0 没有字段则为 0 表示默讣颜色弹幕',
                    \`p_group_id\` int(11) NOT NULL DEFAULT 0 COMMENT '不详',
                    \`group_name\` varchar(255) NOT NULL COMMENT '默认是鱼吧',
                    \`p_group_name\` varchar(255) NOT NULL COMMENT '不详',
                    \`level\` bigint(20) NOT NULL COMMENT '用户等级',
                    \`fu_num\` int(11) NOT NULL COMMENT '关注的主播数',
                    \`fg_num\` int(11) NOT NULL COMMENT '不详',
                    \`fans_num\` int(11) NOT NULL COMMENT '粉丝数',
                    \`group_title\` varchar(255) NOT NULL COMMENT '不详',
                    \`feed_num\` int(11) NOT NULL COMMENT '不详',
                    \`is_anchor\` varchar(255) NOT NULL COMMENT '不详',
                    \`group_level\` int(255) NOT NULL COMMENT '不详',
                    \`account_type\` int(11) NOT NULL COMMENT '不详',
                    \`account_comments\` varchar(255) NOT NULL COMMENT '不详',
                    \`timestamp\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录的时间',
                    \`id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '记录id',
                    PRIMARY KEY (\`id\`)
                ) ENGINE=\`InnoDB\` AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ROW_FORMAT=DYNAMIC COMMENT='' CHECKSUM=0 DELAY_KEY_WRITE=0;`
        
        this._db.query(sql, callback);

    }


    insertData(table, list){

        let sql = `insert into ${table} (uid, nickname, avatar, summary, is_follow, gender, group_id, p_group_id, group_name, p_group_name, level, fu_num, fg_num, fans_num, group_title, feed_num, is_anchor, group_level, account_type, account_comments) VALUES `;

        let val = '';
        
        list.forEach((item) => {

            val += `,('${item.uid}', '${item.nickname}', '${item.avatar}', '${item.summary}', '${item.is_follow}', '${item.gender}', '${item.group_id}', '${item.p_group_id}', '${item.group_name}', '${item.p_group_name}', '${item.level}', '${item.fu_num}', 
                
                '${item.fg_num}', '${item.fans_num}', '${item.group_title}', '${item.feed_num}', '${item.is_anchor}', '${item.group_level}', '${item.account_type}', '${item.account_comments}')`;

        });

        val = val.replace(',', '');

        sql += val;

        return this._db.query(sql);

    }

 }

module.exports = Generation;