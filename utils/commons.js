var http = require("../utils/http")

/**
 * Search space name in spaces and returns its guid
 * @param  {Object} spaces
 * @param  {String} string
 * @return {String}
 */
function searchSpace(spaces, _space) {
    var guid = "";
    for (var i = 0, z = spaces.resources.length; i < z; i++) {
        if (spaces.resources[i].entity.name === _space) {
            guid = spaces.resources[i].metadata.guid;
            break;
        }
    }
    if (guid === "") {
        return {
            "error": "invalid space"
        };
    } else {
        return guid;
    }
}

/**
 * Cleans data from Bluemix API to simplify it
 * @param  {Object} json
 * @return {Object}
 */
function cleanResults(json) {
    if (!typeof(json) === "object" || !json.resources) {
        return json;
    }

    for (var i = 0, z = json.resources.length; i < z; i++) {
        delete json.resources[i].metadata.url;
        delete json.resources[i].metadata.created_at;
        delete json.resources[i].metadata.updated_at;
        delete json.resources[i].entity.credentials;
        delete json.resources[i].entity.service_plan_guid
        delete json.resources[i].entity.gateway_data;
        delete json.resources[i].entity.dashboard_url;
        delete json.resources[i].entity.type;
        delete json.resources[i].entity.tags;
        delete json.resources[i].entity.last_operation;
        delete json.resources[i].entity.service_plan_url;
        delete json.resources[i].entity.service_bindings_url;
        delete json.resources[i].entity.routes_url;
        delete json.resources[i].entity.service_keys_url;

        delete json.resources[i].entity.stack_guid;
        delete json.resources[i].entity.buildpack;
        delete json.resources[i].entity.detected_buildpack;
        delete json.resources[i].entity.version;
        delete json.resources[i].entity.command;
        delete json.resources[i].entity.console;
        delete json.resources[i].entity.debug;
        delete json.resources[i].entity.staging_task_id;
        delete json.resources[i].entity.package_state;
        delete json.resources[i].entity.staging_task_id;
        delete json.resources[i].entity.diego;
        delete json.resources[i].entity.docker_image;
        delete json.resources[i].entity.package_updated_at;
        delete json.resources[i].entity.detected_start_command;
        delete json.resources[i].entity.enable_ssh;
        delete json.resources[i].entity.docker_credentials_json;
        delete json.resources[i].entity.space_url;
        delete json.resources[i].entity.stack_url;
        delete json.resources[i].entity.events_url;
        delete json.resources[i].entity.environment_json;

        //delete json.resources[i].entity.organization_guid;
        delete json.resources[i].entity.space_quota_definition_guid;
        delete json.resources[i].entity.allow_ssh;
        delete json.resources[i].entity.organization_url;
        delete json.resources[i].entity.developers_url;
        delete json.resources[i].entity.managers_url;
        delete json.resources[i].entity.auditors_url;
        delete json.resources[i].entity.apps_url;
        delete json.resources[i].entity.domains_url;
        delete json.resources[i].entity.service_instances_url;
        delete json.resources[i].entity.app_events_url;
        delete json.resources[i].entity.security_groups_url;
    }
    return json;
}

/**
 * Cleans data from Bluemix Container API to simplify it
 * @param  {Object} json
 * @return {Object}
 */
function cleanResultsC(json) {
    if (!typeof(json) === "object") {
        return json;
    }

    for (var i = 0, z = json.length; i < z; i++) {
        delete json[i].Command;
        delete json[i].Created;
        delete json[i].SizeRootFs;
        delete json[i].SizeRw;
        delete json[i].Started;
    }
    return json;
}

/**
 * Replaces {{variable}} strings in the urls passed to getUrl function with the options["variable"] setted
 * @param  {String} url
 * @param  {Object} options
 * @return {String}
 */
function replaceVariablesInURL(url, options) {
    var param = /\{\{(.*?)\}\}/g;
    var match = param.exec(url);
    while (match !== null) {
        url = url.replace(match[0], options[match[1]]);
        match = param.exec(url);
    }
    return url;
}

/**
 * Executes a function before check if TTL is expired or not. If expired it will do login againg with user and password from bluemix object ("that")
 * @param  {Object} that   [Bluemix instance]
 * @param  {Function} resolve
 * @param  {Function} reject
 * @param  {Function} fn   [function to execute]
 * @return {JSON or text}
 */
function getData(that, resolve, reject, fn, options) {
    if (new Date() >= that.ctx.getTokenTTL()) {
        console.info("refreshing login")
        that.ctx.login(that.ctx.getUser(), that.ctx.getPassword())
            .then(
                function() {
                    fn(that, resolve, reject, options)
                }
        )
    } else {
        fn(that, resolve, reject, options)
    }
}

/**
 * Wrapper function to make generic requests
 * @param  {String} url
 * @param  {String} token_type
 * @param  {Object} that //for accessing parent context
 * @param  {String} http method
 * @return {JSON or text}
 */
function requestWrapper(url, that, options, method) {
    var fn = function(that, resolve, reject, options) {
        http.requestWithAuth(url, that.ctx.auth.token_type, that.ctx.auth.access_token, options, method, resolve, reject)
    }
    return new Promise(function(resolve, reject) {
        getData(that, resolve, reject, fn, options)
    });
}


exports.getData = getData;
exports.searchSpace = searchSpace;
exports.cleanResults = cleanResults
exports.cleanResultsC = cleanResultsC
exports.requestWrapper = requestWrapper;