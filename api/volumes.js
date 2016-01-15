var http = require("../utils/http")
var commons = require("../utils/commons")

function volumes(context) {
    this.ctx = context;
}

volumes.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/volumes/json", this, options);
}

module.exports = volumes;