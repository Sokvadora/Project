
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

//----------------------------Поиск-------------------------------

app.post("/search", jsonParser, function(req, res){  

    if(!req.body) return res.sendStatus(400);
    const db = req.app.locals.db;

    const letSearch1 = req.body.search1[0];
    const letSearch2 = req.body.search2[0];
    const letSearch3 = req.body.search3[0];
    let sumSearch = [];
 
//если все поля пусты - вывести все

if ((letSearch1.length == 0) && (letSearch2 == 0)&& (letSearch3 == 0)){ 
    db.collection("orgs").find({}).toArray(function(err, orgs){
        if(err) return console.log(err);
        res.send(orgs)
    });
} 
// если выбран ключ и метро - показать совпадения
else if (!(letSearch1.length == 0) && !(letSearch2 == 0)) {
   
 db.collection("orgs").find({'key': letSearch1}).toArray(function(err, searchkey){
        if(err) return console.log(err);
        searchM1 = searchkey;  
    });

   db.collection("orgs").find({ "metro":letSearch2}).toArray(function (err, searchkey) {
        if (err) return console.log(err);
        
        searchM2 = searchkey;
        for (i=0; i< searchM1.length; i++) {
            for (j=0; j< searchM2.length; j++) {
                if (searchM1[i].name == searchM2[j].name) {
                    sumSearch.push(searchM1[i]);
                    console.log(searchM1[i]);
                    continue;
                }
                
            }
        
        }
        console.log(sumSearch)
        res.send(sumSearch);

        if (sumSearch.length == 0) {
             console.log( "Ничего не найдено!" );
            };
    }); 
        } 
        
      // если выбран ключ и возраст - показать совпадения
else if (!(letSearch1.length == 0) && !(letSearch3 == 0)) {
  
 db.collection("orgs").find({'key': letSearch1}).toArray(function(err, searchkey){
        if(err) return console.log(err);
        searchM1 = searchkey;  
    });

   db.collection("orgs").find({ "age":letSearch3}).toArray(function (err, searchkey) {
        if (err) return console.log(err);
        searchM3 = searchkey;
        for (i=0; i< searchM1.length; i++) {
            for (j=0; j< searchM3.length; j++) {
                  // for (y=0; y < searchM3.length; y++){
                if (searchM1[i].name == searchM3[j].name) {
                    sumSearch.push(searchM1[i]);
                    console.log(searchM1[i]);
                    continue;
                }
                
            }
        
        }
        console.log(sumSearch)
        res.send(sumSearch);
        if (sumSearch.length == 0) {
            console.log( "Ничего не найдено!" );
           };
    });
}  
// если выбран метро и возраст - показать совпадения
else if (!(letSearch2.length == 0) && !(letSearch3 == 0)) {

 db.collection("orgs").find({'metro': letSearch2}).toArray(function(err, searchkey){
        if(err) return console.log(err);
        searchM2 = searchkey;  
    });
   db.collection("orgs").find({ "age":letSearch3}).toArray(function (err, searchkey) {
        if (err) return console.log(err);
        searchM3 = searchkey;
        for (i=0; i< searchM2.length; i++) {
            for (j=0; j< searchM3.length; j++) {
                  // for (y=0; y < searchM3.length; y++){
                if (searchM2[i].name == searchM3[j].name) {
                    sumSearch.push(searchM2[i]);
                    console.log(searchM2[i]);
                    continue;
                }
                
            }
        }
        console.log(sumSearch)
        res.send(sumSearch);
        if (sumSearch.length == 0) {
            console.log( "Ничего не найдено!" );
           };
    });
}   
 
        else { 
            // только возраст, метро или ключ

//поиск по ключевым словам 
            db.collection("orgs").find({'key' :letSearch1}).toArray(function(err, searchkey){
                if(err) return console.log(err);
                    if (searchkey.length > 0)
                     for (i = 0; i < searchkey.length; i++)
                         sumSearch.push(searchkey[i])
    
                });

//поиск по возрасту
                db.collection("orgs").find({'age' :letSearch3}).toArray(function(err, searchage){
                    if(err) return console.log(err);
                    if (searchage.length > 0)
                        for (i = 0; i < searchage.length; i++)
                            sumSearch.push(searchage[i])
                        
                    });


//поиск по станции метро
                db.collection("orgs").find({ "metro": letSearch2 }).toArray(function (err, searchmetro) {
                if (err) return console.log(err);

                if (searchmetro.length > 0)
                    for (i = 0; i < searchmetro.length; i++)
                        sumSearch.push(searchmetro[i]);

                res.send(sumSearch);
                if (sumSearch.length == 0) {
                    console.log( "Ничего не найдено!" );
                   };
                });
             }
       
});


//вывод всех
app.get("/orgs", function(req, res){  

    const db = req.app.locals.db;

    db.collection("orgs").find({}).toArray(function(err, orgs){
        if(err) return console.log(err);
        res.send(orgs)
        if (sumSearch.length == 0) {
            console.log( "Ничего не найдено!" );
           };
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

