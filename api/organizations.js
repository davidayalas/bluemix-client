var http = require("../utils/http")
var commons = require("../utils/commons")

function organizations(context) {
    this.ctx = context;
}

organizations.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region) + "/v2/organizations", this, options);
}

module.exports = organizations;