const userId = 1681080;

const redis = require('redis');

const option = require('../../config/redis.js');

let client = redis.createClient(option);

client.BLPOP('news', 1, (err, res)=>{

    console.log(res)

});

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