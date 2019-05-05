

module.exports = {
  before : function(user) {
     
    user.globals.waitForConditionTimeout = 5000;
  
  },

  'отображение всех организаций' : function (user) {

    user
      .url('http://localhost:3000/')
      .waitForElementPresent('body', 2000)
      .waitForElementVisible('.section-heading')
      .click('#loadsportCarts', function(result) {
        this.expect.element('.orgs').to.be.visible;
        
        this.expect.element('.cart').to.be.present.before(1000);
        this.expect.element('.allCarts').to.be.not.visible;
      })
      .pause(2000);
       
  }, 
 
  'выбор организации' : function (user) {

    user
      .click('.name', function(result) {
        this.pause(2000);
        this.verify.urlEquals("http://localhost:3000/org/%D0%94%D0%B2%D0%BE%D1%80%D0%B5%D1%86%20%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%B0%20%22%D0%92%D0%BE%D0%BB%D0%BD%D0%B0%22");
        this.expect.element('#nameOrg').to.be.present;
        this.expect.element('.orgDescrtiption').to.be.present;
        this.expect.element('.img-container').to.be.visible;
        this.expect.element('#map').to.be.visible;
      });
    
  },
 


 
  after : function(user) {
    user.end();
  }
};