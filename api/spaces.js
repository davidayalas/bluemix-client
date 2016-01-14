var http = require("../utils/http")
var commons = require("../utils/commons")

function spaces(context) {
    this.ctx = context;
}

spaces.prototype.getAll = function(options) {
    var that = this;
    options.apply_fn = commons.cleanResults;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

spaces.prototype.get = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces/" + options.space_guid + "/summary", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

spaces.prototype.create = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "POST", resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

spaces.prototype.delete = function(options) {
    var that = this;

    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getEndpoint(options.region) + "/v2/spaces/" + options.space_guid, that.ctx.auth.token_type, that.ctx.auth.access_token, options, "DELETE", resolve, reject)
    }

    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}


module.exports = spaces;