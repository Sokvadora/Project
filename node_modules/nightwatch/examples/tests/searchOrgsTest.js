 module.exports = {
   before: function (user) {
     user.globals.waitForConditionTimeout = 5000;

   },

   'поиск организаций в категории "спорт"': function (user) {

     user
       .url('http://localhost:3000/')
       .waitForElementPresent('body', 2000)
       .waitForElementVisible('.section-heading')
       .click('#loadsportCarts', function (result) {
         this.expect.element('.sportCarts').to.be.visible;
         this.expect.element('.orgs').to.be.visible;
         this.expect.element('.allCarts').to.be.not.visible;
       });
   },

   'поиск по ключевым словам': function (user) {
     user
       .setValue('input[type=text]', 'хоккей')
       .pause(2000)
       .click('#btnSearch', function (result) {
         this.pause(2000)
         this.expect.element('.cart').to.be.present;
         this.expect.element('.orgs  > *:nth-child(2)').to.be.visible;

       })
       console.log('2 организации по данному запросу');
   },


   'поиск заведомо неверного значения': function (user) {
     user
       .setValue('input[type=text]', 'ewew')
       .pause(2000)
       .click('#btnSearch', function (result) {
         this.pause(2000)
         this.expect.element('.cart').to.be.not.present
         console.log("Поиск не дал результатов");
       })
   },

   'поиск по станции метро': function (user) {
     user
       .click('select[id="metroId"] option[value="Улица Дыбенко"]')
       .pause(2000)

       .click('#btnSearch', function (result) {
         this.pause(2000);
         //ожидается, что .orgs имеет 3 прямых дочерних элемента
         this.expect.element('.orgs  > *:nth-child(3)').to.be.visible
       });
     console.log('3 организации по данному запросу');
   },

   'поиск по возрасту': function (user) {
     user
       .click('select[id="ageId"] option[value="60+"]')
       .pause(2000)

       .click('#btnSearch', function (result) {
         this.pause(2000);
         //ожидается, что .orgs имеет 4 прямых дочерних элемента
         this.expect.element('.orgs  > *:nth-child(4)').to.be.visible
       });
     console.log('4 организации по данному запросу');
   },


   'поиск по ключевому слову и метро': function (user) {
     user
       .setValue('input[type=text]', 'фигурное катание')
       .pause(2000)
       .click('select[id="metroId"] option[value="Спортивная"]')
       .pause(2000)

       .click('#btnSearch', function (result) {
         this.pause(2000);
         this.expect.element('.cart').to.be.present;
         //ожидается, что .orgs имеет 1 прямых дочерних элемента
         this.expect.element('.orgs  > *:nth-child(1)').to.be.visible
       });
     console.log('1 организация по данному запросу');
   },

   'поиск по ключевому слову и возрасту': function (user) {
     user
       .setValue('input[type=text]', 'борьба')
       .pause(2000)
       .click('select[id="ageId"] option[value="взрослые"]')
       .pause(2000)

       .click('#btnSearch', function (result) {
         this.pause(2000);
         this.expect.element('.cart').to.be.present;
         //ожидается, что .orgs имеет 4 прямых дочерних элемента
         this.expect.element('.orgs  > *:nth-child(4)').to.be.visible
       });
     console.log('4 организация по данному запросу');
   },

   after: function (user) {
     user.end();
   }
 };