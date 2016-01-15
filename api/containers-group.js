var http = require("../utils/http")
var commons = require("../utils/commons")

function containersGroup(context) {
    this.ctx = context;
}

/* 
 * GET Space Groups
 */
containersGroup.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/groups", this, options);
}

/* 
 * GET Group Summary
 */
containersGroup.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/groups/" + options.group, this, options);
}

/* 
 * DELETE delete Group
 */
containersGroup.prototype.delete = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/groups/" + options.group, this, options, "DELETE");
}


/* 
 * PATCH Update Group
 */
containersGroup.prototype.update = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/groups/" + options.group, this, options, "PATCH");
}


module.exports = containersGroup;