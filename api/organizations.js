var http = require("../utils/http")
var commons = require("../utils/commons")

function organizations(context) {
    this.ctx = context;
}

organizations.prototype.getAll = function(options) {
    var that = this;

    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/organizations", that.ctx.auth.token_type, that.ctx.auth.access_token)
            .then(function(results) {
                results = JSON.parse(results);
                resolve(results);
            })
            .catch(function(error) {
                reject(error);
            });
    }

    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });

}

module.exports = organizations;