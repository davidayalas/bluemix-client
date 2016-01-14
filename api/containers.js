var http = require("../utils/http")
var commons = require("../utils/commons")

function containers(context) {
    this.ctx = context;
}


/* 
 * GET Space Containers
 */
containers.prototype.getAll = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/json", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * GET Container Summary
 */
containers.prototype.get = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/json", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * POST Start Container
 */
containers.prototype.start = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/start", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "POST", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * POST Stop Container
 */
containers.prototype.stop = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/stop", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "POST", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * POST Restart Container
 */
containers.prototype.restart = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/restart", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "POST", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * POST Pause Container
 */
containers.prototype.pause = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/pause", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "POST", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * POST Unpause Container
 */
containers.prototype.unpause = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/unpause", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "POST", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/* 
 * DELETE Remove Container
 */
containers.prototype.delete = function(options) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/pause", that.ctx.auth.token_type, that.ctx.auth.access_token, options, "DELETE", resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = containers;