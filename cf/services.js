var http = require("../utils/http")
var commons = require("../utils/commons")

function services(context){
	this.ctx = context;
}

function get(that, resolve, reject, options){
	commons.getUrl(that.ctx.getEndpoint(options.region) + "/v2/spaces/{{space}}/service_instances", that, resolve, reject, options)
}

/* 
* Get Space Services 
*/
services.prototype.get = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, get, options)
	});
}	

module.exports = services;