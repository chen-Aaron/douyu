const userId = 1681080;

const redis = require('redis');

const Mysql = require('mysql');

const option = require('../../config/redis.js');

const Generate = require('./libs/generate.js');

const db = require('../../config/db');

let mysql = Mysql.createConnection(db);

let client = redis.createClient(option);

let generate = new Generate(mysql, client);

// console.log(new Error('error'))

generate.run();

// generate.getRedisUids().then((res)=>{

//     console.log(res)

// }).catch((e)=>{console.log('yse',e)});

// client.LPUSH('news', [1,2,3].slice(), (err, res)=>{

//     console.log(res)

// });

// console.log(msg)

const api = `https://yuba.douyu.com/wbapi/web/user/detail/${userId}`;

// {
//     "data": {
//         "uid": 1681080,
//         "nickname": "一曲清溪之路",
//         "avatar": "https://apic.douyucdn.cn/upload/avatar/001/68/10/80_avatar_middle.jpg",
//         "gender": "0",
//         "is_follow": 0,
//         "summary": "",
//         "group_id": 0,
//         "group_name": "鱼吧",
//         "p_group_name": "",
//         "p_group_id": 0,
//         "level": 10,
//         "fu_num": 47,
//         "fg_num": 1,
//         "fans_num": 0,
//         "feed_num": 0,
//         "is_anchor": false,
//         "self": false,
//         "group_level": 0,
//         "group_title": "",
//         "account_type": 0,
//         "account_comments": ""
//     },
//     "message": "success",
//     "status_code": 200
// }