var http = require("../utils/http")
var commons = require("../utils/commons")

function events(context) {
    this.ctx = context;
}

events.prototype.apps = function() {
    return new apps(this.ctx);
}

events.prototype.services = function() {
    return new services(this.ctx);
}

/*
 * Apps
 */
function apps(context) {
    this.ctx = context;
}

apps.prototype.get = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        commons.getUrl(that.ctx.getEndpoint(options.region) + "/v2/events?q=type:audit.app." + options.type, that, resolve, reject, options)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/*
 * Services
 */
function services(context) {
    this.ctx = context;
}

services.prototype.get = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        commons.getUrl(that.ctx.getEndpoint(options.region) + "/v2/events?q=type:audit.service_instance." + options.type, that, resolve, reject, options)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = events;