var http = require("../utils/http")
var commons = require("../utils/commons")

function containers(context){
	this.ctx = context;
}


/* 
* GET Space Containers 
*/
containers.prototype.getAll = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/json", that, resolve, reject, options, {"X-Auth-Project-Id": "guid", "Accept": "application/json"});
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* GET Container Summary
*/
containers.prototype.get = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/containers/{{container}}/json", that, resolve, reject, options, {"X-Auth-Project-Id": "guid", "Accept": "application/json"});
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* POST Start Container
*/
containers.prototype.start = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.postWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/start", that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options.form, "POST")
		.then(
			function(status){
				resolve(status)
			}
		)
		.catch(
			function(error){
				reject(error)
			}
		)
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* POST Stop Container
*/
containers.prototype.stop = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.postWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/stop", that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options.form, "POST")
		.then(
			function(status){
				resolve(status)
			}
		)
		.catch(
			function(error){
				reject(error)
			}
		)
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* POST Restart Container
*/
containers.prototype.restart = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.postWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/stop", that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options.form, "POST")
		.then(
			function(status){
				resolve(status)
			}
		)
		.catch(
			function(error){
				reject(error)
			}
		)
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* POST Pause Container
*/
containers.prototype.pause = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.postWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/stop", that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options.form, "POST")
		.then(
			function(status){
				resolve(status)
			}
		)
		.catch(
			function(error){
				reject(error)
			}
		)
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* POST Unpause Container
*/
containers.prototype.unpause = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.postWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/stop", that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options.form, "POST")
		.then(
			function(status){
				resolve(status)
			}
		)
		.catch(
			function(error){
				reject(error)
			}
		)	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

/* 
* DELETE Remove Container
*/
containers.prototype.delete = function(options){
	var that = this;
	var fn = function(that, resolve, reject, options){
		http.deleteWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"?force=1", that.ctx.auth.token_type, that.ctx.auth.access_token, {"X-Auth-Project-Id": options.guid, "Accept": "application/json"}, options.form, "DELETE")
		.then(
			function(status){
				resolve(status)
			}
		)
		.catch(
			function(error){
				reject(error)
			}
		)
	}
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, fn, options)
	});
}	

module.exports = containers;