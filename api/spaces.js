var http = require("../utils/http")
var commons = require("../utils/commons")

function spaces(context){
	this.ctx = context;
}

function get(that, resolve, reject, options){
	http.getWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces?results-per-page=100", that.ctx.auth.token_type, that.ctx.auth.access_token)
	.then(function(results){
		results = JSON.parse(results);
		commons.cleanResults(results);
		resolve(results);
	})
	.catch(function(error){
		reject(error);
	});	
}

spaces.prototype.get = function(options){
	var that = this;
	return new Promise(function (resolve, reject){
		commons.getData(that, resolve, reject, get, options)
	});

}

module.exports = spaces;