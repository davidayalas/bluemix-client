var http = require("../utils/http")
var commons = require("../utils/commons")

function quota(context) {
    this.ctx = context;
}


/* 
 * GET - List container sizes and quota limits
 */
quota.prototype.getUsage = function (options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/usage", this, options);
}

/* 
 * GET - Retrieve organization and space specific quota
 */
quota.prototype.get = function (options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/quota", this, options);
}

/* 
 * PUT - Update space quota
 */
quota.prototype.update = function (options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/quota", this, options, "PUT");
}

module.exports = quota;