require('dotenv').config({ path: '../.env' })
console.log('process.env.SIGNING_SECRET', process.env.SIGNING_SECRET)
var mysql      = require('mysql2');
var tokenUtility = require('./token-utility');
/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'Bealy',
  password : 'Bealy',
  database : 'bealy'
});*/
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : '127.0.0.1',
    user            : 'Bealy',
    password        : 'Bealy',
    database        : 'bealy',
    waitForConnections: true
});

const createUser = async (user) =>{
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            let password = tokenUtility.hashAPass(user.password)
            connection.query(`INSERT INTO user (id, password) VALUES ('${user.id}','${password}')`, function(err, data){
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return tokenUtility.generateNewPair(user.id)
};
const deleteUser = async (user) =>{
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`DELETE FROM user WHERE id='${user.id}'`, function(err, data){
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return returnValue
};
const validateUser = async (user) =>{
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            let password = tokenUtility.hashAPass(user.password)
            connection.query(`SELECT user.id, user.password FROM user WHERE id='${user.id}' AND password='${password}'`, function(err, data){
                if (err){
                    console.log('err', err)
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return tokenUtility.generateNewPair(user.id)
};
const createRoom = async (room) =>{
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`INSERT INTO room (currentUser, invitedUser) VALUES ('${room.currentUser}','${room.invitedUser}')`, function(err, data){
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return;
};
const getRoom = async (currentUser) =>{
    //todo - add the files here
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            connection.query(`SELECT * FROM room WHERE currentUser='${currentUser}' OR invitedUser='${currentUser}'`, function(err, data){
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return returnValue;
};

const uploadFile = async(file)=>{
    console.log('uploadFile file', file)
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            var query = `INSERT INTO files SET ?`
            let values = {fileId:file.body.name, fileContents:file.file.buffer, roomId:file.body.roomId}
            connection.query(query, values, function(err, data){
                if (err){
                    reject(err)
                } else {
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return returnValue;  
};

const getFile = async (roomId, fileId, currentUser) =>{
    console.log({roomId, fileId, currentUser})
    let returnValue = await new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection){
            if (err) throw err;
            let queryString = `SELECT * FROM files, room
            WHERE files.roomId = '${roomId}'
            AND (room.currentUser='${currentUser}' OR room.invitedUser='${currentUser}')
            AND files.fileId = '${fileId}' LIMIT 1`
            console.log('queryString', queryString)
            connection.query(queryString
                , function(err, data){
                if (err){
                    console.log('err', err)
                    reject(err)
                } else {
                    console.log('data', data)
                    resolve(data)
                }
            })
            connection.release();
        });
    })
    return returnValue;
};

module.exports = {createUser, deleteUser, validateUser, createRoom, getRoom, uploadFile, getFile};