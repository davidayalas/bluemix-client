var http = require("../utils/http")
var commons = require("../utils/commons")

function spaces(context){
	this.ctx = context;
}

spaces.prototype.getAll = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces?results-per-page=100", that.ctx.auth.token_type, that.ctx.auth.access_token)
		.then(function(results){
			results = JSON.parse(results);
			commons.cleanResults(results);
			resolve(results);
		})
		.catch(function(error){
			reject(error);
		});	
	}

	return new Promise(function (resolve, reject){
		commons.getData(that, resolve, reject, fn, options)
	});
}

spaces.prototype.get = function(options){
	var that = this;
	options.apply_fn = commons.cleanResults;
	var fn = function(that, resolve, reject, options){
		commons.requestWrapper(that.ctx.getEndpoint(options.region) + "/v2/spaces/"+options.guid+"/summary", that.ctx.auth.token_type, that.ctx.auth.access_token, null, null, null, resolve, reject)
	}
	return new Promise(function (resolve, reject){
		commons.getData(that, resolve, reject, fn, options)
	});
}

spaces.prototype.create = function(options){
	var that = this;

	var fn = function(that, resolve, reject, options){	
		commons.requestWrapper(that.ctx.getEndpoint(options.region) + "/v2/spaces", that.ctx.auth.token_type, that.ctx.auth.access_token, null, options, "POST", resolve, reject)
	}

	return new Promise(function (resolve, reject){
		commons.getData(that, resolve, reject, fn, options)
	});
}

spaces.prototype.delete = function(options){
	var that = this;

	var fn = function(that, resolve, reject, options){	
		commons.requestWrapper(that.ctx.getEndpoint(options.region) + "/v2/spaces/"+ options.guid, that.ctx.auth.token_type, that.ctx.auth.access_token, null, null, "DELETE", resolve, reject)
	}

	return new Promise(function (resolve, reject){
		commons.getData(that, resolve, reject, fn, options)
	});
}


module.exports = spaces;