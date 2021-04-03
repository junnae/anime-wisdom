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
        encrypt: !('DEBUG' in process.env)
    }
}
let connection = new Connection(config)

function checkQuotes(id, callback) {
    let exists = false;
    let request = new Request('SELECT COUNT(*) FROM dbo.quotes WHERE id = @id;', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, exists)
        }
    });

    request.addParameter('id', TYPES.BigInt, id)
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            exists = column.value > 0
        });
    })
    getConnection().execSql(request)
}

function getQuoteById(id, callback) {
    let quote = undefined;
    let request = new Request('SELECT quote FROM dbo.quotes WHERE id = @id;', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, quote)
        }
    });

    request.addParameter('id', TYPES.BigInt, id)
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            quote = column.value
        });
    })
    getConnection().execSql(request)
}

function checkGifs(id, callback) {
    let exists = false;
    let request = new Request('SELECT COUNT(*) FROM dbo.gifs WHERE id = @id;', (err, rowCount) => {
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

function getRandomQuote(callback) {
    let result = {};
    let request = new Request('SELECT TOP 1  id, quote FROM dbo.quotes ORDER BY newid() ;', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, result)
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if(column.metadata.colName === "id") result["id"] = column.value
            if(column.metadata.colName === "quote") result["advice"] = column.value
        });
    })
    getConnection().execSql(request)
}

function getRandomGif(callback) {
    let result = undefined;
    let request = new Request('SELECT TOP 1  id FROM dbo.gifs ORDER BY newid() ;', (err, rowCount) => {
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

function numberOfQuotes(callback) {
    let result = undefined;
    let request = new Request('SELECT COUNT(*) FROM dbo.quotes', (err, rowCount) => {
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
    let request = new Request('SELECT COUNT(*) FROM dbo.gifs', (err, rowCount) => {
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

function insertQuote(id, quote, callback) {
    let ok = false;
    let request = new Request('INSERT INTO dbo.quotes VALUES(@id, @quote);', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, ok)
        }
    });

    request.addParameter('id', TYPES.BigInt, id)
    request.addParameter('quote', TYPES.VarChar, quote)
    getConnection().execSql(request)
}

connection.on('connect', function(err) {
    console.log('Connected');
    if (err) {
        console.error(err);
    }
});

function insertGif(id, callback) {
    let ok = false;
    let request = new Request('INSERT INTO dbo.gifs VALUES(@id);', (err, rowCount) => {
        if(err){
            callback(err);
        } else {
            callback(null, ok)
        }
    });

    request.addParameter('id', TYPES.VarChar, id)
    getConnection().execSql(request)
}

function connect(){
    connection.connect();

}

function getConnection(){
    return connection;
}



module.exports = { connect, getConnection, checkGifs, numberOfGifs, insertGif, getRandomGif, numberOfQuotes, checkQuotes, insertQuote, getRandomQuote, getQuoteById }
