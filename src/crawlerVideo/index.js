/*
 * @Author: Aaron 
 * @Date: 2018-05-21 09:35:07 
 * @Last Modified by:   Aaron 
 * @Last Modified time: 2018-05-21 09:35:07 
 */

const ffmpeg = require('fluent-ffmpeg');

const Fs = require('fs');

const video = 'https://al.flv.huya.com/huyalive/24710374-2191935826-9414292687600746496-14158524-10057-A-0-1.flv?wsSecret=710a5dd3311475a4ea05d42f68f07dde&wsTime=5b00180a&u=2582724788&t=100&sv=1805181656';

const video2 = 'https://bvc.live-play.acgvideo.com/live-bvc/485928/live_2084361_3378306.flv?wsSecret=030ce7d0826626a362f88a1b03991d9a&wsTime=1526735845';

let command = ffmpeg('test.mp4').output(Fs.createWriteStream('test2.mp4'));

