var http = require("../utils/http")
var commons = require("../utils/commons")

function logs(context) {
    this.ctx = context;
}

function cleanLog(data) {
    if (!data) {
        return data;
    }
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
    options.apply_fn = cleanLog;
    return commons.requestWrapper(this.ctx.getLogsEndpoint(options.region) + "/recent?app=" + options.app_guid, this, options);
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

containers.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/" + options.container + "/logs", this, options);
}

module.exports = logs;