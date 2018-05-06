
// var douyu = require('./chat/room');

// const Times = require('./chat/utils/date.js');

// let fileName = new Times().initializes();

// fileName = fileName.replace(/-/g, '_');

// const Danmu = require('./database/danmu');

// const db = require('./config/db');

// var roomID = '1972046';

// let table = `${roomID}_${fileName}`;

// let danmu = new Danmu(db);

// let queue = [];

// danmu.connectDb();

// danmu.dealTable(table, (status)=>{

// 	if(status){

// 		let room = new douyu(roomID);

// 		room.on('chatmsg', function (message) {

// 			let time = new Times().getDetail();

// 			queue.push(message);

// 			if( queue.length > 5 ){

// 				queue.forEach((item)=>{

// 					item['gt'] = item['gt'] ? item['gt'] : 0;
// 					item['col'] = item['col'] ? item['col'] : 0;
// 					item['ct'] = item['ct'] ? item['ct'] : 0;
// 					item['bnn'] = item['bnn'] ? item['bnn'] : '';
// 					item['bl'] = item['bl'] ? item['bl'] : '';
// 					item['ic'] = item['ic'] ? item['ic'] : 0;
// 					item['brid'] = item['brid'] ? item['brid'] : 0;
// 					item['sahf'] = item['sahf'] ? item['sahf'] : '';
// 					item['cst'] = item['cst'] ? item['cst'] : '';
// 					item['hc'] = item['hc'] ? item['hc'] : '';
// 					item['el'] = item['el'] ? item['el'] : '';
// 					item['lk'] = item['lk'] ? item['lk'] : '';
// 					item['repin'] = item['repin'] ? item['repin'] : '';
// 					item['repout'] = item['repout'] ? item['repout'] : '';
// 					item['bbm'] = item['bbm'] ? item['bbm'] : '';

// 				})

// 				danmu.insertDb(table, queue, (error, results, fields)=>{

// 					queue = [];

// 				});

// 			}

// 			let msg = `[${message.nn}]:${message.txt}。[time]:${time}\n`;

// 			console.log(msg);

// 		});

// 		// Knock, knock ...
// 		room.open();

// 	}

// })
const MyDouYu = require('./src/index');

let room = ['1972046', '9999'];

// let room = ['507882']

room.forEach((item)=>{

	let client = new MyDouYu(item);

	client.init();

	client.getComment();

	client.getGift();

})
