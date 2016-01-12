var http = require("../utils/http")
var commons = require("../utils/commons")

function logs(context){
	this.ctx = context;
}

function cleanLog(data) {
    data = data.split('\n\n');
    var start;
    var end;
    for (i = 0; i < data.length; i++) {
        end = data[i].indexOf(String.fromCharCode(16));
        //start = data[i].slice(0,2)=="--"?0:2;
        data[i] = data[i].slice(2, end);
    }
    return data.join('\n');
};


/*
* Apps Logs
*/
function appget(that, resolve, reject, options){	
	options.apply_fn = cleanLog;
	commons.getUrl(that.ctx.getLogsEndpoint(options.region) + "/recent?app={{app}}", that, resolve, reject, options)
}

function apps(context){
	this.ctx = context;	
}

logs.prototype.apps = function(){
	return new apps(this.ctx);
}

apps.prototype.get = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, appget, options)
	});
}

/*
* Container Logs
*/
function containerget(that, resolve, reject, options){
	commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/{{container}}/logs", that, resolve, reject, options, {"X-Auth-Project-Id": "guid", "Accept": "application/json"})
}

function containers(context){
	this.ctx = context;	
}

logs.prototype.containers = function(){
	return new containers(this.ctx);
}

containers.prototype.get = function(space){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, containerget, space)
	});
}

module.exports = logs;
