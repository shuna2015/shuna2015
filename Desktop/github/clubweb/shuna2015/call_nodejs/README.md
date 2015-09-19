Call - A powerful way to get data 

<pre>
  npm install call-external
</pre>

Built upon Request it has extended functionality. 

```javascript
var Call = require('call-external');
new Call().setObject({"name": "The Developer"}).timer().http({"url": "http://google.com", "cb": function(c){
  console.log(c.data.substr(0,200));
  console.log(c.obj.name);
}});
```


```javascript
new Call().http({"url": "http://google.com", "cb": function(c){
  console.log(c.data);
}});
```

More Features coming soon...as well as collaborating packages 