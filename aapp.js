const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
 
let dbClient;
 
app.use(express.static(__dirname + "/public"));

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.db = client.db("Organisations");
    app.listen(3000, function(){
        console.log("Сервер, просто сервер");
    });
});

app.get("/companys", function(req, res){  

    const db = req.app.locals.db;

    db.collection("orgs").find({}).sort({"price" : -1}).toArray(function(err, companys){
        if(err) return console.log(err);
        res.send(companys)
    });
});



app.post("/search", jsonParser, function(req, res){  

    if(!req.body) return res.sendStatus(400);
    const db = req.app.locals.db;

    const letSearch = req.body.searchM[0];
    let sumSearch = [];
    //поиск по названию
    db.collection("orgs").find({"key" : letSearch}).sort({"age" : -1}).toArray(function(err, searchkey){
        if(err) return console.log(err);
        //res.send(searchname)
        if (searchkey.length > 0)
            for (i = 0; i < searchkey.length; i++)
                sumSearch.push(searchkey[i])
            console.log('sumSearch1:',sumSearch)
    });
    //поиск по актёрам
    db.collection("orgs").find({ "metro": letSearch }).sort({ "age": -1 }).toArray(function (err, searchmetro) {
        if (err) return console.log(err);
        //res.send(searchmetro)
        if (searchmetro.length > 0)
            for (i = 0; i < searchmetro.length; i++)
                sumSearch.push(searchmetro[i]);
        console.log('sumSearch2:', sumSearch)
        res.send(sumSearch);
    });
});

//фильтрация и сортировка
app.post("/companys", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const checkedmetro = req.body.metroM;
    const checkedprice = req.body.priceM;
    const checkedprice1 = checkedprice[0]
    let checkedprice2 = checkedprice[1]
    if (checkedprice2 == 0) checkedprice2 = 10000;
    const checkedSort = req.body.sortM;
    console.log(checkedmetro)
    console.log(checkedprice1, checkedprice2)
    const db = req.app.locals.db;

    //проверка на жанры
    if (!(checkedmetro.length == 0)) {
        if (checkedSort == "price") {
            db.collection("orgs").find({"metroN" : { $all : checkedmetro}, "price" : { $gte: checkedprice1, $lte: checkedprice2}}).sort({"price" : -1}).toArray(function(err, companys){
                if(err) return console.log(err);
                res.send(companys)
                console.log(companys)
            });
        }
        if (checkedSort == "price") {
            db.collection("orgs").find({"metroN" : { $all : checkedmetro}, "price" : { $gte: checkedprice1, $lte: checkedprice2}}).sort({"price" : -1}).toArray(function(err, companys){
                if(err) return console.log(err);
                res.send(companys)
                console.log(companys)
            });
        }
        if (checkedSort == "age") {
            db.collection("orgs").find({"metroN" : { $all : checkedmetro}, "price" : { $gte: checkedprice1, $lte: checkedprice2}}).sort({"age" : -1}).toArray(function(err, companys){
                if(err) return console.log(err);
                res.send(companys)
                console.log(companys)
            });
        }
        
    } else {
        if (checkedSort == "price") {
            db.collection("orgs").find({"price" : { $gte: checkedprice1, $lte: checkedprice2}}).sort({"price" : -1}).toArray(function(err, companys){
                if(err) return console.log(err);
                res.send(companys)
                console.log(companys)
            });
        }
        if (checkedSort == "price") {
            db.collection("orgs").find({"price" : { $gte: checkedprice1, $lte: checkedprice2}}).sort({"price" : -1}).toArray(function(err, companys){
                if(err) return console.log(err);
                res.send(companys)
                console.log(companys)
            });
        }
        if (checkedSort == "age") {
            db.collection("orgs").find({"price" : { $gte: checkedprice1, $lte: checkedprice2}}).sort({"age" : -1}).toArray(function(err, companys){
                if(err) return console.log(err);
                res.send(companys)
                console.log(companys)
            });
        }
        
    }
    
});

app.get('/org/:name', function (req, res) {
    console.log('name:', req.params.name);
    res.send('org');
  });

/*
удаление элемента строки:
stroka = "qwe qweqwe(/$'";
stroka.replace(/\//, "_"); слеш
*/
/*
stroka = "qwe q/weq/we(/$'";
stroka.replace(/\w/g, "_");
*//*
stroka = "qwe q/weq/we(/$'";
stroka.replace(/\N/g, "_"); удаление не цифр
*//*
stroka = "qwe q/weq/we(/$'";
stroka.test(/\N/g); есть/нет */
/*
stroka = "qwe q/weq/we(/$'";
stroka.match(/w/g); поиск */


// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});