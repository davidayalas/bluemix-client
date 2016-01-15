var http = require("../utils/http")
var commons = require("../utils/commons")

function containers(context) {
    this.ctx = context;
}


/* 
 * GET Space Containers
 */
containers.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/json", this, options);
}

/* 
 * GET Container Summary
 */
containers.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/json", this, options);
}

/* 
 * POST Start Container
 */
containers.prototype.start = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/start", this, options, "POST");
}

/* 
 * POST Stop Container
 */
containers.prototype.stop = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/stop", this, options, "POST");
}

/* 
 * POST Restart Container
 */
containers.prototype.restart = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/restart", this, options, "POST");
}

/* 
 * POST Pause Container
 */
containers.prototype.pause = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/pause", this, options, "POST");
}

/* 
 * POST Unpause Container
 */
containers.prototype.unpause = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/unpause", this, options, "POST");

}

/* 
 * DELETE Remove Container
 */
containers.prototype.delete = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/"+options.container+"/delete", this, options, "DELETE");
}

module.exports = containers;