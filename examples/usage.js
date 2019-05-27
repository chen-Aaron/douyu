// Douyu API Usages

// Import library
var douyu = require('../index.js');

const Fs = require('fs');

const Times = require('../chat/utils/date.js');

let fileName = new Times().initializes();

const Danmu = require('../database/danmu');

const db = require('../config/db');

let danmu = new Danmu();




// Initialize Room entity

//峰哥房间
// var roomID = "9999";

var args = process.argv.slice(2);

console.log(args);

var roomID = args[0];

let dir = `./word/${roomID}`;

let time = new Times().getDetail();

let fileDir = `${dir}/word${fileName}-${time}.txt`;

console.log('its start')

Fs.exists(dir, (res)=>{

	if( !res ){
		console.log('its startss', dir)


		Fs.mkdir(dir, (err)=>{
			if(err) return;

			let stream = Fs.createWriteStream(fileDir);

			var room = new douyu.Room(roomID);

			// System level events handler
			room.on('connect', function (message) {
				console.log('DouyuTV ChatRoom #' + roomID + ' connected.');
			});
			room.on('error', function (error) {
				console.error('Error: ' + error.toString());
			});
			room.on('close', function (hasError) {
				console.log('DouyuTV ChatRoom #' + roomID + ' disconnected' + hasError ? ' because of error.' : '.');
			});

			// Chat server events
			room.on('chatmsg', function (message) {

				let time = new Times().getDetail();

				let msg = `[${message.nn}]:${message.txt}。[time]:${time}\n`;

				stream.write(msg);

				console.log(message);

			});

			// Knock, knock ...
			room.open();


		});
	} else {
		let stream = Fs.createWriteStream(fileDir);

		var room = new douyu.ChatRoom(roomID);

		console.log('its start', room)

		// System level events handler
		// room.on('connect', function (message) {
		// 	console.log('DouyuTV ChatRoom #' + roomID + ' connected.');
		// });
		room.on('error', function (error) {
			console.error('Error: ' + error.toString());
		});
		room.on('close', function (hasError) {
			console.log('DouyuTV ChatRoom #' + roomID + ' disconnected' + hasError ? ' because of error.' : '.');
		});

		// Chat server events
		room.on('chatmsg', function (message) {

			let time = new Times().getDetail();

			let msg = `[${message.nn}]:${message.txt}。[time]:${time}\n`;

			stream.write(msg);

			// Fs.writeFile('./word.txt', msg, (err)=>{
			// 	if(err){
			// 		console.log(err);
			// 	}
			// });

			console.log(message);

		});


		room.on('uenter', (message)=>{

			console.log(message)

		})

		// Knock, knock ...
		console.log(room.open)
		room.open();
	}

})



