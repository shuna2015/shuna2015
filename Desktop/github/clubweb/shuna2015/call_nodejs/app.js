var Call = require('./Call.js');


//CRUD 
//--------------------------------------------------------------------------------------------------
var c = require("mongojs").connect("mongodb://username:password@dburl1,dburl2:port/database", ["users"]);

//CREATE 
new Call().client(c).collection('users').data({"name": "John"}).cb(function(e, r){

}).create();

//READ 
new Call().client(c).collection('users').data({"name": "John"}).cb(function(e, r){

}).read();

//UPDATE 
new Call().client(c).collection('users').data({"name": "Jack"}).cb(function(e, r){

}).update();

//DELETE 
new Call().client(c).collection('users').data({"name": "John"}).cb(function(e, r){

}).delete();

//EXISTS 
new Call().client(c).collection('users').data({"name": "John"}).cb(function(e, r){

}).exists();

//COMPOUND  
new Call().client(c).collection('users').data({"name": "John"}).options({"upsert": true}).sort({"count": -1}).limit(10).page(1).cb(function(e, r){

}).update();



//CRUD 
//--------------------------------------------------------------------------------------------------
var c = require("redis").createClient(port, dns).auth(password).on("error", function(err){}).on("connect", function(err){});

//CREATE 
new Call().client(c).data(["1234567-name","John"]).cb(function(e, r){

}).create();

//READ 
new Call().client(c).data("1234567-name").cb(function(e, r){

}).read();

//UPDATE 
new Call().client(c).data(["1234567-name","John"]).cb(function(e, r){

}).update();

//DELETE 
new Call().client(c).data("1234567-name").cb(function(e, r){

}).delete();

//EXISTS 
new Call().client(c).data("1234567-name").cb(function(e, r){

}).exists();

//COMPOUND  
new Call().client(c).data("1234567-name").sort({"count": -1}).limit(10).page(1).cb(function(e, r){

}).run({"ttl"});



//CRUD HTTP 
//--------------------------------------------------------------------------------------------------

//CREATE 
new Call().client("http://google.com").options({"method" : "POST"}).cb(function(e, r){
  
}).run();

//READ 
new Call().client("http://google.com").options({"method" : "GET"}).cb(function(e, r){
  
}).run();

//UPDATE 
new Call().client("http://google.com").options({"method" : "PUT"}).cb(function(e, r){
  
}).run();

//DELETE 
new Call().client("http://google.com").options({"method" : "DELETE"}).cb(function(e, r){
  
}).run();

//COMPOUND  
new Call().client("http://google.com").data({"name": "John"}).options({"method": "POST", "timeout": 8000, "headers": {"content-type": "application/x-www-form-urlencoded"} }).sort({"count": -1}).limit(10).page(1).cb(function(e, r){
  
}).run();

