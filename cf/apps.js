var http = require("../utils/http")
var commons = require("../utils/commons")

/**
 * This is the object constructor for Bluemix Managing Apps
 * @constructor
 */
function apps(context){
	this.ctx = context;
}

/**
 * Get Apps in Space
 * @param  {Object} options [options.region, options.space]
 * @return {JSON}
 */
apps.prototype.get = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, get, options)
	});
}	

function get(that, resolve, reject, options){
	commons.getUrl(that.ctx.getEndpoint(options.region)+"/v2/spaces/{{space}}/apps", that, resolve, reject, options)
}

/**
 * Get App Summary
 * @param  {Object} options [options.region, options.space, options.app]
 * @return {JSON}
 */
apps.prototype.getApp = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, getApp, options)
	});
}	

function getApp(that, resolve, reject, options){
	commons.getUrl(that.ctx.getEndpoint(options.region)+"/v2/apps/{{app}}/summary", that, resolve, reject, options)
}


module.exports = apps;