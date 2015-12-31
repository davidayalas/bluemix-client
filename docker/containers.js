var http = require("../utils/http")
var commons = require("../utils/commons")

function containers(context){
	this.ctx = context;
}

function get(that, resolve, reject, options){

	commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/json", that, resolve, reject, options,{"X-Auth-Project-Id": "guid", "Accept": "application/json"})

}

/* 
* Get Space Containers 
*/
containers.prototype.get = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, get, options)
	});
}	

module.exports = containers;