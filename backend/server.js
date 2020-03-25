const express = require('express');
const app = express();
const router = express.Router();
var mongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-yqxar.mongodb.net/test?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

var database;


mongoClient.connect(uri, function (error, data) {
    if (error) {
        console.log(error);
    }
    console.log("connected")
    database = data;
})

app.use('/',
    router.get('/getAllTodo', function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        database.db('todo-database').collection('todo-items')
            .find()
            .toArray(function (err, result) {
                if (err) {
                    console.log(err)
                }
                res.json(result)
            })
    }),
    router.post('/addTodo', function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        database.db('todo-database').collection('todo-items')
            .insertOne({ title: req.params.title }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            })
    })
    ,
    router.post('/delTodo', function (req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Headers", "*");
        database.db('todo-database').collection('todo-items')
            .deleteOne({ title: req.params.title }, function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            })
    })
);

app.listen(PORT, function () {
    console.log(`App is listening on port: ${PORT}`);
})