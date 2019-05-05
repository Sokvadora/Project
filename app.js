const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", {
    useNewUrlParser: true
});

let dbClient;

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use('/js', express.static('js'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/sportAll', function (req, res) {
    res.render('sportAll');
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/artAll', function (req, res) {
    res.render('artAll');
});

app.get('/addOrganisation', function (req, res) {
    res.render('addOrganisation');
});



app.use(express.static(__dirname + "/public"));

//подключение к бд и серверу
mongoClient.connect(function (err, client) {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.db = client.db("Organisations");
    app.listen(3000, function () {
        console.log("Сервер прослушивает порт 3000");
    });
});


// все данные из коллекции 
app.get("/orgs", function (req, res) {

    const db = req.app.locals.db;

    db.collection("orgs").find({}).toArray(function (err, orgs) {
        if (err) return console.log(err);
        res.send(orgs);
    });
});


//добавление организации в бд
app.post("/addOrg", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const orgName = req.body.name;
    const orgAge = req.body.age;
    const orgDescription = req.body.description;
    const orgPhone = req.body.phone;
    const orgAdres = req.body.adres;
    const orgMetro = req.body.metro;
    const orgUrl = req.body.url;
    const orgPrice = req.body.price;
    const orgWork = req.body.work;
    const orgKey = req.body.key;

    const org = {
        name: orgName,
        age: orgAge,
        description: orgDescription,
        phone: orgPhone,
        adres: orgAdres,
        metro: orgMetro,
        url: orgUrl,
        price: orgPrice,
        work: orgWork,
        key: orgKey
    };


    const db = req.app.locals.db;
    db.collection("orgs").insertOne(org, function (err, result) {

        if (err) return console.log(err);
        res.send(org);
    });
});



//передача данных на страницу организации


app.get('/org/:name', function (req, res) {

    const db = req.app.locals.db;
    db.collection("orgs").findOne({
        "name": req.params.name
    }, function (err, org) {
        res.render('org', {
            org: org
        });
        console.log(org);
    });

});


//Поиск
app.post("/search", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const db = req.app.locals.db;
    const letSearch1 = req.body.search1[0];
    const letSearch2 = req.body.search2[0];
    const letSearch3 = req.body.search3[0];
    let sumSearch = [];

    //если все поля пусты - вывести все
    if ((letSearch1.length == 0) && (letSearch2 == 0) && (letSearch3 == 0)) {
        db.collection("orgs").find({}).toArray(function (err, orgs) {
            if (err) return console.log(err);
            res.send(orgs);
        });
    } else if (!(letSearch1.length == 0) && !(letSearch2 == 0)) { // если выбран ключ и метро - показать совпадения

        db.collection("orgs").find({
            'key': letSearch1
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            searchM1 = searchkey;
        });

        db.collection("orgs").find({
            "metro": letSearch2
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            searchM2 = searchkey;
            for (i = 0; i < searchM1.length; i++) {
                for (j = 0; j < searchM2.length; j++) {
                    if (searchM1[i].name == searchM2[j].name) {
                        sumSearch.push(searchM1[i]);

                        continue;
                    }
                }
            }
            res.send(sumSearch);
            (sumSearch.length !== 0) ? console.log(sumSearch): console.log("Ничего не найдено!");

        });

    } else if (!(letSearch1.length == 0) && !(letSearch3 == 0)) { // если выбран ключ и возраст - показать совпадения

        db.collection("orgs").find({
            'key': letSearch1
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            searchM1 = searchkey;
        });

        db.collection("orgs").find({
            "age": letSearch3
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            searchM3 = searchkey;
            for (i = 0; i < searchM1.length; i++) {
                for (j = 0; j < searchM3.length; j++) {
                    if (searchM1[i].name == searchM3[j].name) {
                        sumSearch.push(searchM1[i]);
                        continue;
                    }
                }
            }

            res.send(sumSearch);
            (sumSearch.length !== 0) ? console.log(sumSearch): console.log("Ничего не найдено!");
        });

    } else if (!(letSearch2.length == 0) && !(letSearch3 == 0)) { // если выбран метро и возраст - показать совпадения
        db.collection("orgs").find({
            'metro': letSearch2
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            searchM2 = searchkey;
        });

        db.collection("orgs").find({
            "age": letSearch3
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            searchM3 = searchkey;
            for (i = 0; i < searchM2.length; i++) {
                for (j = 0; j < searchM3.length; j++) {
                    if (searchM2[i].name == searchM3[j].name) {
                        sumSearch.push(searchM2[i]);
                        continue;
                    }
                }
            }

            res.send(sumSearch);
            (sumSearch.length !== 0) ? console.log(sumSearch): console.log("Ничего не найдено!");
        });

    } else {
        // только возраст, метро или ключ

        //поиск по ключевым словам 
        db.collection("orgs").find({
            'key': letSearch1
        }).toArray(function (err, searchkey) {
            if (err) return console.log(err);
            if (searchkey.length > 0)
                for (i = 0; i < searchkey.length; i++)
                    sumSearch.push(searchkey[i]);
        });

        //поиск по возрасту
        db.collection("orgs").find({
            'age': letSearch3
        }).toArray(function (err, searchAge) {
            if (err) return console.log(err);
            if (searchAge.length > 0)
                for (i = 0; i < searchAge.length; i++)
                    sumSearch.push(searchAge[i]);
        });

        //поиск по станции метро
        db.collection("orgs").find({
            "metro": letSearch2
        }).toArray(function (err, searchMetro) {
            if (err) return console.log(err);
            if (searchMetro.length > 0)
                for (i = 0; i < searchMetro.length; i++)
                    sumSearch.push(searchMetro[i]);
            res.send(sumSearch);
            (sumSearch.length !== 0) ? console.log(sumSearch): console.log("Ничего не найдено!");
        });
    }

});


//вывод всех
app.get("/orgs", function (req, res) {
    const db = req.app.locals.db;
    db.collection("orgs").find({}).toArray(function (err, orgs) {
        if (err) return console.log(err);
        res.send(orgs);
        (sumSearch.length !== 0) ? console.log(sumSearch): console.log("Ничего не найдено!");
    });
});


//Отправка запроса на добавление организации
app.post('/send', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const output = `
      <p>Новый запрос добавления организации</p>
      <h3>Информация:</h3>
      <ul>  
        <li>Наименование: ${req.body.name}</li>
        <li>Возраст: ${req.body.age} </li>
        <li>Ключевые слова: ${req.body.key} </li>
        <li>Стоимость: ${req.body.price} </li>
        <li>Сайт: ${req.body.mailOrg}</li>
        <li>Адрес: ${req.body.adres}</li>
        <li>Метро: ${req.body.metro}</li>
        <li>Email: ${req.body.email}</li>
        <li>Телефон: ${req.body.phone}</li>
        <li>Режим работы: ${req.body.work}</li>
      </ul>
      <h3>Описание организации</h3>
      <p>${req.body.message}</p>
      <br>
      <h3>Бизнес информация:</h3>
      <ul>  
        <li>Имя контактного лица: ${req.body.nameUser}</li>
        <li>Номер телефона: ${req.body.phoneUser} </li>
        <li>Должность: ${req.body.positionUser}</li>
      </ul> `;

    // подключение к смтп-серверу и шифрование данных клиента
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'elena.spb.bis@gmail.com',
            clientId: '363102063126-5811sce0j3bk76m9dp4ampthokmuhg82.apps.googleusercontent.com',
            clientSecret: '_xNmXAKeRRxwGU7LRr_Jwn4f',
            refreshToken: '1/fVlNZaxVjFaUCu46XSDZ60EDY1EbtJXffjQoJD8QzlBQMq_raVRcA14KfoXm1t5D',
            accessToken: 'ya29.GlvhBmj4hpjwZpXcs8leWqebGtO-HgURJywFndsoC8ovH3e2VDDSGRDcKE2wYEKBvOrYvot7KVymaoF_n0pw1dJX7D-JMMIk4nPfQ-cvA3a_uOzWI42XjaOveoyE'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // данные сообщения
    let mailOptions = {
        from: 'НСХ', // отправитель 
        to: 'mika.love.kattun@gmail.com', // получатель
        subject: 'Новый запрос добавления организации', // тема письма
        text: 'Имеется новый запрос', // текст сообщения
        html: output // html body

    };

    // отправка
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


        app.get('contact', (req, res) => {
            res.render('contact', {
                msg: 'Ваша заявка отправлена. Администратор свяжется с вами'
            });
        });

    });
});


// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});