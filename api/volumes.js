var http = require("../utils/http")
var commons = require("../utils/commons")

function volumes(context) {
    this.ctx = context;
}

volumes.prototype.getAll = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        commons.getUrl(that.ctx.getContainersEndpoint(options.region) + "/volumes/json", that, resolve, reject, options, {
            "X-Auth-Project-Id": "guid",
            "Accept": "application/json"
        });
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = volumes;