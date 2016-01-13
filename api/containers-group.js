var http = require("../utils/http")
var commons = require("../utils/commons")

function containersGroup(context){
	this.ctx = context;
}

/* 
* GET Space Groups 
*/
containersGroup.prototype.getAll = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/groups", that, resolve, reject, options, {"X-Auth-Project-Id": "guid", "Accept": "application/json"});
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* GET Group Summary
*/
containersGroup.prototype.get = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/groups/{{group}}", that, resolve, reject, options, {"X-Auth-Project-Id": "guid", "Accept": "application/json"});
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* PATH Update Group
*/
containersGroup.prototype.update = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		commons.requestWrapper(that.ctx.getContainersEndpoint(options.region) + "/containers/groups/"+options.group, that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options, "PATCH", resolve, reject)
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	


module.exports = containersGroup;