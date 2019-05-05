 module.exports = {
   before: function (user) {
     user.globals.waitForConditionTimeout = 5000;
   },
   'отображение организаций досуга': function (user) {
     user
       .url('http://localhost:3000/')
       .waitForElementPresent('body', 2000)
       .waitForElementVisible('.section-heading')
       .click('#loadsportCarts', function (result) {
         this.expect.element('.orgs').to.be.visible;
         this.expect.element('.allCarts').to.be.not.visible;
       })
       .pause(2000)
       .click("#loadMore", function (result) {
         this.expect.element('.cart').to.be.visible;
         this.expect.element('.orgs  > *:nth-child(3)').to.be.visible;
       })
       .pause(2000)
       .waitForElementVisible('.cart')
       .getText(".cart a", function (result) {
         this.assert.equal(typeof result, "object");
         this.expect.element('.orgs  > *:nth-child(6)').to.be.visible
       })
       .pause(3000)
       .click("#backFromSport", function (result) {
         this.expect.element('.allCarts').to.be.visible;
         this.expect.element('.orgs').to.be.not.visible;
       });
   },
   after: function (user) {
     user.end();
   }
 };