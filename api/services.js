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
        commons.getUrl(that.ctx.getEndpoint(options.region) + "/v2/spaces/{{space}}/service_instances", that, resolve, reject, options)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = services;