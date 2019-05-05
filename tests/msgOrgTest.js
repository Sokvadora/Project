

module.exports = {
  before : function(user) {
     
    user.globals.waitForConditionTimeout = 5000;
  
  },

  'отображение всех организаций' : function (user) {

    user
      .url('http://localhost:3000/')
      .waitForElementPresent('body', 2000)
      .waitForElementVisible('.section-heading')
      .pause(2000)
       
.waitForElementVisible('#fh5co-footer');
       
  }, 
 
  'переход в раздел добавления сообщения' : function (user) {

    user
      .click('.msg', function(result) {
         this.pause(2000);
         this.verify.urlEquals("http://localhost:3000/contact");
         this.expect.element('.company-info').to.be.present;
         this.expect.element('.contact').to.be.present;
        
      });
    
  },
  'заполнение формы' : function (user) {

    user
    .setValue('#name', 'Тестовое название')
    .pause(1000)
    .setValue('#age', 'дети')
    .pause(1000)
    .setValue('#key', 'танцы, балет')
    .pause(1000)
    .setValue('#price', '2000')
    .pause(1000)
    .setValue('#adres', 'Санкт-Петербург')
    .pause(1000)
    .setValue('#metro', 'Ладожская')
    .pause(1000)
    .setValue('#mailOrg', 'mailorg@hhh.ru')
    .pause(1000)
    .setValue('#email', 'email@hhh.ru')
    .pause(1000)
    .setValue('#phone', '89991111111')
    .pause(1000)
    .setValue('#work', 'сб-вс с 12:30 до 18:00')
    .pause(1000)
    .setValue('#desc', 'тестовое описание компании')
    .pause(1000)
    .setValue('#nameUser', 'Представитель компании')
    .pause(1000)
    .setValue('#phoneUser', '89911111111')
    .pause(1000)
    .setValue('#positionUser', 'должность представителя компании')
    .pause(1000)
    .click('#submit', function(result) {
      this.pause(2000);
      
      // this.verify.urlEquals("http://localhost:3000/send); 
   });
  },

  after : function(user) {
    user.end();
  }
};