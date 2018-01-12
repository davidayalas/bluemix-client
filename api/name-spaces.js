var http = require("../utils/http")
var commons = require("../utils/commons")

function nameSpaces(context) {
    this.ctx = context;
}


/* 
 * GET - Check the availability of a namespace
 */
nameSpaces.prototype.checkAvailability = function (options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/registry/namespaces/" + options.namespace, this, options);
}

/* 
 * PUT - Set a namespace for your private Bluemix registry
 */
nameSpaces.prototype.set = function (options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/registry/namespaces/" + options.namespace, this, options, "PUT");
}

/* 
 * GET - Retrieve the namespace of an organization
 */
nameSpaces.prototype.get = function (options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/registry/namespaces", this, options);
}

module.exports = nameSpaces;