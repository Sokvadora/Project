 

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();



// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>Новый запрос добавления организации</p>
    <h3>Информация:</h3>
    <ul>  
      <li>Наименование: ${req.body.name}</li>
      <li>Ключевые слова: ${req.body.key} </li>
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


  var transporter = nodemailer.createTransport({
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
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'НСХ', // sender address
      to: 'mika.love.kattun@gmail.com', // list of receivers
      subject: 'Новый запрос добавления организации', // Subject line
      text: 'Имеется новый запрос', // plain text body
      html: output // html body
      
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Заявка успешно отправлена. Администратор свяжется с Вами.'});
  });
  });






app.listen(3000, () => console.log('Server started...'));

