//var methodCall = require('./grav.test.js').grav_test;
//var methodCall = require('./grav.saveUrl.js').grav_saveUrl;
//var methodCall = require('./grav.userimages.js').grav_userimages;

var Grav = require('./grav');
var grav = new Grav("askmrtillman@gmail.com", "uKLM9SNTR7");
grav.userimages().then((data) => {
  console.log(data);
})