var http = require("../utils/http")
var commons = require("../utils/commons")

function containers(context) {
    this.ctx = context;
}


/* 
 * GET - List available public IP addresses in a space
 */
containers.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/floating-ips", this, options);
}

/* 
 * POST - Bind a public IP address to a single container
 */
containers.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/" + options.container + "/floating-ips/" + options.ip + "/bind/", this, options, "POST");
}

/* 
 * POST - Unbind a public IP address from a container
 */
containers.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/" + options.container + "/floating-ips/" + options.ip + "/unbind/", this, options, "POST");
}

/* 
 * POST - Request a public IP address for a space
 */
containers.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/floating-ips/request", this, options, "POST");
}

/* 
 * POST - Release public IP address
 */
containers.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/floating-ips/" + options.ip + "/release/", this, options, "POST");
}

module.exports = containers;