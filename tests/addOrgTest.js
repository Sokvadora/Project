

module.exports = {
  before : function(admin) {
     
    admin.globals.waitForConditionTimeout = 5000;
  
  },

  'отображение формы добавления информации' : function (admin) {

    admin
      .url('http://localhost:3000/addOrganisation')
      .waitForElementPresent('body', 2000)
      .waitForElementVisible('.contact')
      .pause(2000);
      
  }, 
 
   
  'заполнение формы' : function (admin) {

    admin
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
    .setValue('#url', 'mailorg@hhh.ru')
    .pause(1000)
    .setValue('#phone', '89991111111')
    .pause(1000)
    .setValue('#work', 'сб-вс с 12:30 до 18:00')
    .pause(1000)
    .setValue('#description', 'тестовое описание компании')
    .pause(1000)
     
    .click('#submit', function(result) {
      this.pause(2000);
      
      // this.verify.urlEquals("http://localhost:3000/send); 
   });
  },

  after : function(admin) {
    admin.end();
  }
};