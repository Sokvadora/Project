const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
   
const app = express();
const jsonParser = express.json();
 
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
 
let dbClient;
 
app.use(express.static(__dirname + "/public"));
//подключение к бд и серверу
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.db = client.db("Organisations");
    app.listen(3000, function(){
        console.log("Сервер прослушивает порт 3000");
    });
});
// все данные из коллекции 
app.get("/orgs", function(req, res){  

    const db = req.app.locals.db;

    db.collection("orgs").find({}).toArray(function(err, orgs){
        if(err) return console.log(err);
        res.send(orgs)
    });
});

 






//фильтрация и сортировка
app.post("/movies", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const checkedGenre = req.body.genreM;
    const checkedYear = req.body.yearM;
    const checkedYear1 = checkedYear[0]
    let checkedYear2 = checkedYear[1]
    if (checkedYear2 == 0) checkedYear2 = 2050;
    const checkedSort = req.body.sortM;
   // console.log(checkedGenre)
   // console.log(checkedYear1, checkedYear2)
    const db = req.app.locals.db;

    //проверка на жанры
    if (!(checkedGenre.length == 0)) {
        
        if (checkedSort == "price") {
            db.collection("orgs").find( { }).sort({"price" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(orgs)
               // console.log(orgs)
            });
        }

        /*
        if (checkedSort == "rating") {
            db.collection("films").find({"genreN" : { $all : checkedGenre}, "year" : { $gte: checkedYear1, $lte: checkedYear2}}).sort({"rating" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(movies)
                console.log(movies)
            });
        } */
        /*
        if (checkedSort == "year") {
            db.collection("films").find({"genreN" : { $all : checkedGenre}, "year" : { $gte: checkedYear1, $lte: checkedYear2}}).sort({"year" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(movies)
                console.log(movies)
            });
        }*/

        /*
        if (checkedSort == "views") {
            db.collection("films").find({"genreN" : { $all : checkedGenre}, "year" : { $gte: checkedYear1, $lte: checkedYear2}}).sort({"views" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(movies)
                console.log(movies)
            });
        }
        */
    } else {

        if (checkedSort == "price") {
            db.collection("orgs").find({}).sort({"rating" : -1}).toArray(function(err, orgs){
                if(err) return console.log(err);
                res.send(orgs)
               // console.log(orgs)
            });
        }
        /*
        if (checkedSort == "rating") {
            db.collection("films").find({"year" : { $gte: checkedYear1, $lte: checkedYear2}}).sort({"rating" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(movies)
                console.log(movies)
            });
        }*/
      /*
        if (checkedSort == "year") {
            db.collection("films").find({"year" : { $gte: checkedYear1, $lte: checkedYear2}}).sort({"year" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(movies)
                console.log(movies)
            });
        }  */
        /*
        if (checkedSort == "views") {
            db.collection("films").find({"year" : { $gte: checkedYear1, $lte: checkedYear2}}).sort({"views" : -1}).toArray(function(err, movies){
                if(err) return console.log(err);
                res.send(movies)
                console.log(movies)
            });
        }
        */
    }
    
});





//----------------------------пewrwrк-------------------------------
app.post("/search", jsonParser, function(req, res){  

    if(!req.body) return res.sendStatus(400);
    const db = req.app.locals.db;

    const letSearch1 = req.body.search1[0];
    const letSearch2 = req.body.search2[0];
    let sumSearch = [];


//если оба поля пусты - вывести все
     
if ((letSearch1.length == 0) && (letSearch2 == 0)){ 
    db.collection("orgs").find({}).toArray(function(err, orgs){
        if(err) return console.log(err);
        res.send(orgs)
    });
}
// если выбран ключ и метро - показать совпадения
else if (!(letSearch1.length == 0) && !(letSearch2 == 0)) {
        //поиск по ключевым словам
        db.collection("orgs").find({"key" : letSearch1}).toArray(function(err, searchkey){
            if(err) return console.log(err);
            searchM1 = searchkey;  
        });

        /*db.collection("orgs").find({"year" : letSearch3}).toArray(function(err, searchkey){
            if(err) return console.log(err);
            searchM3 = searchkey;    
        });*/
        //поиск по станции метро
        db.collection("orgs").find({ "metro": letSearch2 }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            //res.send(searchmetro)
            /*if (searchmetro.length > 0)
                for (i = 0; i < searchmetro.length; i++)
                    sumSearch.push(searchmetro[i]);*/
            searchM2 = searchkey;
            for (i=0; i< searchM1.length; i++) {
                for (j=0; j< searchM2.length; j++) {
                        //for (y=0; y < searchM3.length; yy+)
                    if (searchM1[i].name == searchM2[j].name) {
                        sumSearch.push(searchM1[i]);
                        console.log(searchM1[i]);
                        continue;
                    }
                }
            }
            console.log(sumSearch)
            res.send(sumSearch);
        
        });
            } else { // только метро или ключ
 //поиск по ключевым словам
 db.collection("orgs").find({"key" : letSearch1}).toArray(function(err, searchkey){
    if(err) return console.log(err);
    //res.send(searchname)
    if (searchkey.length > 0)
        for (i = 0; i < searchkey.length; i++)
            sumSearch.push(searchkey[i])
        //console.log('sumSearch1:',sumSearch)
});
//поиск по станции метро
db.collection("orgs").find({ "metro": letSearch2 }).toArray(function (err, searchmetro) {
    if (err) return console.log(err);
    //res.send(searchmetro)
    if (searchmetro.length > 0)
        for (i = 0; i < searchmetro.length; i++)
            sumSearch.push(searchmetro[i]);
   // console.log('sumSearch2:', sumSearch)
    res.send(sumSearch);
});
            }
           
});
 







/*---------------------------поиск-------------------------------
app.post("/search", jsonParser, function(req, res){  

    if(!req.body) return res.sendStatus(400);
    const db = req.app.locals.db;

    const letSearch = req.body.searchM[0];
    let sumSearch = [];
    //поиск по ключевым словам
    db.collection("orgs").find({"key" : letSearch}).toArray(function(err, searchkey){
        if(err) return console.log(err);
        //res.send(searchname)
        if (searchkey.length > 0)
            for (i = 0; i < searchkey.length; i++)
                sumSearch.push(searchkey[i])
            //console.log('sumSearch1:',sumSearch)
    });
    //поиск по станции метро
    db.collection("orgs").find({ "metro": letSearch }).toArray(function (err, searchmetro) {
        if (err) return console.log(err);
        //res.send(searchmetro)
        if (searchmetro.length > 0)
            for (i = 0; i < searchmetro.length; i++)
                sumSearch.push(searchmetro[i]);
       // console.log('sumSearch2:', sumSearch)
        res.send(sumSearch);
    });
});

*/ 

//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
app.get("/orgs", function(req, res){  

    const db = req.app.locals.db;

    db.collection("orgs").find({}).toArray(function(err, orgs){
        if(err) return console.log(err);
        res.send(orgs)
    });
});



 

app.get('/org/:name', function (req, res) {
    console.log('name:', req.params.name);
    res.send('org');
  });

 

 
  
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});

