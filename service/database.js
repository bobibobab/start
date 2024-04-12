const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

// Connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('moneyMom');
const userCollection = db.collection('user');
const comsumptionCollection = db.collection('comsumption');
const totalCollection = db.collection('total');

    // Test that you can connect to the database
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

function getUser(userName){
    return userCollection.findOne({ userName: userName });
}

function getUserByToken(token){
    return userCollection.findOne({token: token});
}

function getTotal(userName){
    return totalCollection.findOne({ username: userName });
}

function getComsupmtions(){
    return comsumptionCollection.find().toArray();
}

async function updateTotal(username, total){
    return await totalCollection.updateOne(username, total);
}

async function getTotals(){
    return sortTotals();
}
    
async function createUser(username, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
        userName: username,
        password: hashedPassword,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}


async function addTotal(total){
    await totalCollection.insertOne(total);
}

async function addComsumption(comsumption){
    await comsumptionCollection.insertOne(comsumption)
}

function sortTotals(){
    const query = {total: {$gt: 0}};
    const options = {
        sort: {total: -1},
    };
    const newTotal = totalCollection.find(query, options);
    return newTotal.toArray();
}

module.exports = {
    getUser,
    createUser,
    getComsupmtions,
    addComsumption,
    addTotal,
    getUserByToken,
    getTotal,
    updateTotal,
    getTotals
}