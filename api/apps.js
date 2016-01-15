var http = require("../utils/http")
var commons = require("../utils/commons")

/**
 * This is the object constructor for Bluemix Managing Apps
 * @constructor
 */
function apps(context) {
    this.ctx = context;
}

/**
 * Get Apps in Space
 * @param  {Object} options [options.region, options.space_guid]
 * @return {JSON}
 */
apps.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region) + "/v2/spaces/" + options.space_guid + "/apps", this, options);
}


/**
 * Get App Summary
 * @param  {Object} options [options.region, options.app_guid]
 * @return {JSON}
 */
apps.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region) + "/v2/apps/" + options.app_guid + "/summary", this, options);
}

/**
 * POST Stops App
 * @param  {Object} options [options.region, options.app_guid]
 * @return {JSON}
 */
apps.prototype.stop = function(options) {
    return commons.requestWrapper(this.ctx.getEndpoint(options.region) + "/v3/apps/" + options.app_guid + "/stop", this, options, "PUT");
}

module.exports = apps;