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
    app.locals.collection = client.db("AllOrgDB").collection("Org");
    app.listen(3000, function(){
        console.log("Сервер:3000");
    });
});

success: function (orgs) {
	let carts = "";
	$.each(orgs, function (index, org) {
                            carts += cart(org);
                        })
	console.log('carts', carts);
	$(".Orgs-post").append(carts); //div class
}

let cart = function (org) {
        return "<div class='cart' id='" + org._id + "'>" +
            "<a class='title' href='/movie/" + org.nameOrg + "'>" + org.nameOrg + "</br>" +
            "<img src='/img/" + org.imgOrg + "' /></a></br>" + "</div>";
    }

console.log(carts);

/*
app.get("/Org", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, Org){
         
        if(err) return console.log(err);
        res.send(Org)
    });
     
});

*/
/*

app.get("/Org/:id", function(req, res){
        
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, Org){
               
        if(err) return console.log(err);
        res.send(Org);
    });
});

app.post("/Org", jsonParser, function (req, res) {
       
    if(!req.body) return res.sendStatus(400);
       
    const orgName = req.body.nameOrg;
    const orgAge = req.body.ageOrg;
    const Org = {nameOrg: orgName, ageOrg: orgAge};
       
    const collection = req.app.locals.collection;
    collection.insertOne(Org, function(err, result){
               
        if(err) return console.log(err);
        res.send(Org);
    });
});

*/





process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});


//--------------------------------------------------------------------------------------------------

/*const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
mongoClient.connect(function(err, client){
    /*  
    const db = client.db("AllOrgDB");
    const collection = db.collection("Org");
    */
    
    /* добавить запись в бд
    
    let org = {
        
       
        nameOrg : "Шахматы ",
        descriptionOrg : "Спdортивный центр «Волна» в Московском районе - это удачная комбинация высококачественного оборудования, опытных инструкторов, современного и эргономичного зала с приемлемой стоимостью. Мы рассчитаны на клиентов любого достатка, и предлагаем льготное время детям, а также ветеранам, инвалидам пенсионерам. Именно таким представляется современный фитнес СПб. Цены представлены в соответствующем разделе на нашем сайте. Вы всегда можете связаться с нашими специалистами для получения более детальной информации.",
        imgOrg : "images/portdfolio-7.jpg",
        phoneOrg : "8-771-745-44-49",
        adresOrg : "Санкт-Петербург, Московский пр. 120/2",
        metroOrg : "Московские ворота",
        ageOrg : "дети",
        urlOrg : "asddыa.dcom",
        priceOrg : "500р/мес"

    };
    collection.insertOne(org, function(err, result){
          
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
*/

/* все записи из табл
if(err) return console.log(err);
      
    collection.find().toArray(function(err, results){
                 
        console.log(results);
        client.close();
    });
*/
/* только для детей 
if(err) return console.log(err);
      
    collection.find({ageOrg: "дети"}).toArray(function(err, results){
                 
        console.log(results);
        client.close();
    });
*/

/* первую запись
if(err) return console.log(err);
      
    const db = client.db("AllOrgDB");
    db.collection("Org").findOne(function(err, doc){
              
        console.log(doc);
        client.close();
    });

*/

/* конкретное название орг, все данные
if(err) return console.log(err);
      
    const db = client.db("AllOrgDB");
db.collection("Org").findOne({nameOrg: "Шахматы "}, function(err, doc){
             
    console.log(doc);
    client.close();
});

*/


//}); 