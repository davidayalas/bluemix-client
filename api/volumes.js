var http = require("../utils/http")
var commons = require("../utils/commons")

function volumes(context) {
    this.ctx = context;
}

volumes.prototype.getAll = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/volumes/json", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = volumes;