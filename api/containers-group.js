var http = require("../utils/http")
var commons = require("../utils/commons")

function containersGroup(context) {
    this.ctx = context;
}

/* 
 * GET Space Groups
 */
containersGroup.prototype.getAll = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/groups", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * GET Group Summary
 */
containersGroup.prototype.get = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/groups/" + options.group, that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * DELETE delete Group
 */
containersGroup.prototype.delete = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/groups/" + options.group, that.ctx.auth.token_type, that.ctx.auth.access_token, options, "DELETE", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}


/* 
 * PATCH Update Group
 */
containersGroup.prototype.update = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/groups/" + options.group, that.ctx.auth.token_type, that.ctx.auth.access_token, options, "PATCH", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}


module.exports = containersGroup;