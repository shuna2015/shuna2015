
var 
			request = require('request')
		, async = require('async')
		;

var Call = function(){
	this.errors = [];
	this.populate0 = [];
	this.timeoutMilliseconds = null;
	this.dataIn = null;
	this.cbExecuted = false;
	this.logTime0 = false;
	this.dataIn = {};
	this.sort0 = {};
	this.limit0 = 10;
	this.client0 = null;
	this.collection0 = null;
	this.page0 = 1;
	this.schema0 = null;
	this.group0=null;
	this.upday0 = null;
	this.lbday0 = null;
}


//GENERAL 
Call.prototype.client = function (val) {
	this.client0 = val;
	return this;
}

//used for paging 
Call.prototype.limit = function (val) {
	//many times the code will be written to receive a value without the uneccessary bloat of many if statements when there can just be one here 
	if(val != undefined && val != 'undefined')
		this.limit0 = parseInt(val);
	return this;
}

Call.prototype.sort = function (val) {
	this.sort0 = val;
	return this;
}

Call.prototype.page = function (val) {
	//many times the code will be written to receive a value without the uneccessary bloat of many if statements when there can just be one here 
	if(val != undefined && val != 'undefined')
		this.page0 = parseInt(val);
	return this;
}


Call.prototype.data = function (val) {
	this.dataIn = val;
	return this;
}

Call.prototype.service = function (val) {
	this.service = val;
	return this;
}

Call.prototype.logTime = function (val) {
	this.logTime0 = true;
	return this;
}

Call.prototype.cb = function (val) {
	this.cb = val;
	return this;
}

Call.prototype.executeCb = function () {
	this.cbExecuted = true;

	if(this.logTime){
		console.log((new Date().getTime() - this.startTime) + 'ms');
	}

	this.cb(this.errors, this.response);
}

Call.prototype.timeout = function (val) {
	this.timeoutMilliseconds = val;
	return this;
}

Call.prototype.run = function () {
	var call = this;
	if(this.timeoutMilliseconds)
		this.startTime = new Date().getTime();

	if(this.service == 'http')
		httpRunHandler();
	else if(this.service == 'database')
		databaseRunHandler();
	else 
		this.errors.push('Could not determine a service.');

	if(this.timeoutMilliseconds){
		setTimeout(function(){
			if(!call.cbExecuted){
				this.errors.push({"timeout": true});
				call.executeCb();
			}
		}, this.timeoutMilliseconds);
	}
}





//HTTP SPECIFIC 

//use npm url-manipulator if needed 
Call.prototype.url = function (val) {
	this.url = val;
	this.service = 'http';
	return this;
}

Call.prototype.method = function (val) {
	this.serviceType = val;
	this.service = 'http';
	return this;
}

Call.prototype.contentType = function (val) {
	this.contentType = val;
	this.service = 'http';
	return this;
}

function httpRunHandler(){
	var call = this;
	request({
			method: call.serviceType,
			headers: {'content-type' : call.contentType},
			url: call.url, 
			body: call.dataIn
		}, function(err, metaResponse, responseBody){
			call.errors.push(err);
			call.response = responseBody;
			call.executeCb();
		});
}




//non-core helper functions for http 

Call.prototype.http = function (o) {
	this.url(o.url).serviceType('GET').contentType('application/x-www-form-urlencoded').cb(o.cb).timeout(30000).run();
	return this;
}





//DATABASE & REDIS

Call.prototype.collection = function (val) {
	this.collection0 = val;
	return this;
}

Call.prototype.schema = function (val) {
	this.schema0 = val;
	return this;
}

Call.prototype.populate = function (key, val) {
	this.populate0.push({"key": key, "val": val});
	return this;
}

//read works for mongojs, mongoose and redis ...so it has to decide which one to use. mongojs has a collection and redis does not...mongoose uses schema 
Call.prototype.read = function () {
	var call1 = this;
	this.prepBeforeRead();
	if(this.collection0){
		this.client0[this.collection0].find(this.dataIn).skip(this.skip0).limit(this.limit0).sort(this.sort0, function(e, r) {
		  call1.cb(e,r);
		});
	}
	else if(this.schema0){
		//mongoose is a singleton so does not use a client 
		var line = this.schema0.find(this.dataIn, {}, {"limit": this.limit0, "skip": this.skip0, "sort": this.sort0});

		for(var i = 0; i < this.populate0.length; i++)
			line.populate(this.populate0[i].key, this.populate0[i].val);

		line.exec(function(e, r){
			call1.cb(e,r);
		});
	}
	else {
		console.log('must be redis');//program redis query here 
	}
	
}

Call.prototype.aggregate = function () {
	var call1 = this;
	this.prepBeforeRead();
	if(this.schema0){
		//mongoose is a singleton so does not use a client 
		var line = this.schema0.aggregate(this.dataIn);

		line.exec(function(e, r){
			call1.cb(e,r);
		});
	}
	else {
		console.log('must be redis');//program redis query here 
	}
	
}

Call.prototype.count = function () {
	var call1 = this;
	this.prepBeforeRead();

	//mongoose schema works but mongojs was not test!
	if(this.collection0){
		this.client0[this.collection0].count(this.dataIn, function(e, r) {
		  call1.cb(e,r);
		});
	}
	else if(this.schema0){
		//mongoose is a singleton so does not use a client 
		var line = this.schema0.find(this.dataIn, {}).count();
        line.exec(function(e, r){
			call1.cb(e,r);
		});
	}
	else {
		console.log('must be redis');//program redis query here 
	}
	
}
//do this so that the developer using this code does not have to worry about order of their operations as long as skip and page are declared before execute for example. without this if skip were defined in its set function then skip would be based on the default limit not the developer limit if limit was set after skip. remove this thought from the developer so they can focus on coding.
Call.prototype.prepBeforeRead = function () {
	this.skip0 = this.page0 > 0 ? ((this.page0-1)*this.limit0) : 0
}


Call.prototype.create = function () {
	var call1 = this;
	
	if(this.collection0){
		
	}
	else if(this.schema0){
		//mongoose is a singleton so does not use a client 
		var item = new this.schema0(this.dataIn);
		item.save(function(e, r){
			call1.cb(e,r);
		});
	}
	else {
		console.log('must be redis');//program redis query here 
	}
	
}

Call.prototype.update = function (updateData) {
	var call1 = this;
	
	if(this.collection0){
		
	}
	else if(this.schema0){
		//mongoose is a singleton so does not use a client 
		this.schema0.update(this.dataIn, updateData, {}, function(e, r){
			call1.cb(e,r);
		});
	}
	else {
		console.log('must be redis');//program redis query here 
	}
	
}

Call.prototype.updateinc = function (updateData) {
	var call1 = this;
	
	if(this.collection0){
		
	}
	else if(this.schema0 && updateData>this.dataIn ){
		//mongoose is a singleton so does not use a client 
		this.schema0.update(this.dataIn, updateData, {}, function(e, r){
			call1.cb(e,r);
		});
	}
	else {
		this.schema0.update(this.dataIn, this.dataIn, {}, function(e, r){
			call1.cb(e,r);
		});
	}
	
}

Call.prototype.delete = function () {
	var call1 = this;
	
	if(this.collection0){

	}
	else if(this.schema0){
		//mongoose is a singleton so does not use a client 
		/*
		var item = new this.schema0(this.dataIn);
		item.remove(function(e, r){
			call1.cb(e,r);
		});
		*/
		this.schema0.find(this.dataIn, function(e, r) {
        if(e || !r.length)
          return call1.cb(e,r);
        async.each(r, function(doc, cb) {
          doc.remove(function(err) {
            if (err)
              return cb(err)
            cb()
          })
        },
      function(e) {
        call1.cb(e,r);
      })
    })

	}
	else {
		console.log('must be redis');//program redis query here 
	}
	
}

module.exports = Call;
