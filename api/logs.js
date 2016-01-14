var http = require("../utils/http")
var commons = require("../utils/commons")

function logs(context) {
    this.ctx = context;
}

function cleanLog(data) {
    data = data.split('\n\n');
    var start;
    var end;
    for (i = 0; i < data.length; i++) {
        end = data[i].indexOf(String.fromCharCode(16));
        //start = data[i].slice(0,2)=="--"?0:2;
        data[i] = data[i].slice(2, end);
    }
    return data.join('\n');
};


/*
 * Apps Logs
 */
function apps(context) {
    this.ctx = context;
}

logs.prototype.apps = function() {
    return new apps(this.ctx);
}

apps.prototype.get = function(options) {
    var that = this;
    options.apply_fn = cleanLog;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getLogsEndpoint(options.region) + "/recent?app="+options.app_guid, that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

/*
 * Container Logs
 */
function containers(context) {
    this.ctx = context;
}

logs.prototype.containers = function() {
    return new containers(this.ctx);
}

containers.prototype.get = function(space) {
    var that = this;
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(that.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/logs", that.ctx.auth.token_type, that.ctx.auth.access_token, options, null, resolve, reject);
    }
    return new Promise(function(resolve, reject) {
        commons.getData(that, resolve, reject, fn, options)
    });
}

module.exports = logs;