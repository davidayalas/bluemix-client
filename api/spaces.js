var http = require("../utils/http")
var commons = require("../utils/commons")

function spaces(context) {
    this.ctx = context;
}

spaces.prototype.getAll = function(options) {
    options.apply_fn = commons.cleanResults;
    return commons.requestWrapper(this.ctx.getEndpoint(options.region) + "/v2/spaces", this, options);
}

spaces.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region)  + "/v2/spaces/" + options.space_guid + "/summary", this, options);
}

spaces.prototype.create = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region)  + "/v2/spaces", this, options, "POST");
}

spaces.prototype.delete = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region)  + "/v2/spaces/" + options.space_guid, this, options, "DELETE");
}


module.exports = spaces;