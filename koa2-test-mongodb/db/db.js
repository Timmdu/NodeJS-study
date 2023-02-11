const mongoose = require('mongoose');
//通过mongoose连接mongodb
const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

mongoose.set('strictQuery', true);

mongoose.connect(`${url}/${dbName}`);

const db = mongoose.connection;
db.on('error', err => {
    console.error(err);
})

db.on('open', () => {
    console.log('mongoose connect success...');
})

db.on('close', () => {
    console.log('mongodb close...');
})

module.exports = mongoose