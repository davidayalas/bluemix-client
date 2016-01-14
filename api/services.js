var http = require("../utils/http")
var commons = require("../utils/commons")

function services(context) {
    this.ctx = context;
}

/* 
 * Get Space Services
 */
services.prototype.getAll = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces/" + options.space_guid + "/service_instances", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = services;