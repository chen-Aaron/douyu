// 获取各个主播房间号
class Rooms {
    
    constructor(connection){

        this._connection = connection;
        
    }

    // 关闭连接
    closeDb() {

        this._connection.end();
    }

    // 获取房间号
    getRooms(callback, limit){

        let thisLimit = limit ? limit : 10;

        let sql = `select roomId from anchors where status = 0 limit ${thisLimit}`;

        this._connection.query(sql, callback)

    }

    // 更新房间信息
    upDateRooms(roomId, status, callback){

        let sql = `update anchors set status = ${status} where roomId = ${roomId}`;

        this._connection.beginTransaction((err)=>{

            if( err ) throw err;

            this._connection.query(sql, (err, results, fields)=>{

                if (err) {
                    return this._connection.rollback(function () {
                        throw error;
                    });
                }

                callback(results, fields);

            })

        })

    }

}

module.exports = Rooms;