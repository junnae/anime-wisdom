const Connection = require('tedious').Connection
const Request = require('tedious').Request
const TYPES = require('tedious').TYPES;
require('dotenv').config()


let config = {
    server: process.env.DB_SERVER,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PW
        }
    },
    options: {
        database: process.env.DB_NAME,
        encrypt: false
    }
}
let connection = new Connection(config)

function checkGifs(id, callback) {
    let exists = false;
    let request = new Request('SELECT COUNT(*) FROM gifs WHERE id = @id;', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, exists)
        }
    });

    request.addParameter('id', TYPES.VarChar, id)
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            exists = column.value > 0
        });
    })
    getConnection().execSql(request)
}

function getRandomGif(callback) {
    let result = undefined;
    let request = new Request('SELECT TOP 1  id FROM gifs ORDER BY newid() ;', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, result)
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            result = column.value
        });
    })
    getConnection().execSql(request)
}

function numberOfGifs(callback) {
    let result = undefined;
    let request = new Request('SELECT COUNT(*) FROM gifs', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, result)
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            result = column.value
        });
    })
    getConnection().execSql(request)
}

function insertGif(id, callback) {
    let ok = false;
    let request = new Request('INSERT INTO gifs VALUES(@id);', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, ok)
        }
    });

    request.addParameter('id', TYPES.VarChar, id)
    getConnection().execSql(request)
}

connection.on('connect', function(err) {
    console.log('Connected');
    if (err) {
        console.log(err);
    }
});


function connect(){
    connection.connect();

}

function getConnection(){
    return connection;
}



module.exports = { connect, getConnection, checkGifs, numberOfGifs, insertGif, getRandomGif }
