var http = require("../utils/http")
var commons = require("../utils/commons")

function services(context) {
    this.ctx = context;
}

/* 
 * Get Space Services
 */
services.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region) + "/v2/spaces/" + options.space_guid + "/service_instances", this, options);
}

module.exports = services;