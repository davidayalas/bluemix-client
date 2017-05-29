var Promise = require('bluebird');

/**
 * This is the object constructor for Bluemix managing
 * @constructor
 */
function Bluemix(options) {
    this.username = "";
    this.password = "";
    this.endpoint = "https://api.{{region}}.bluemix.net";
    this.containers_endpoint = "https://containers-api.{{region}}.bluemix.net/v3",
    this.logs_endpoint = "",
    this.default_region = "ng";
    this.info = {};
    this.auth = {};
    this.auth.token_ttl = 0;
}

/**
 * Get bluemix endpoint
 * @param {String} region
 * @return {String}
 */
Bluemix.prototype.getEndpoint = function(region) {
    if (!region) {
        region = this.default_region;
    }
    return this.endpoint.replace("{{region}}", region);
}

/**
 * Get bluemix containers endpoint
 * @param {String} region
 * @return {String}
 */
Bluemix.prototype.getContainersEndpoint = function(region) {
    if (!region) {
        region = this.default_region;
    }
    return this.containers_endpoint.replace("{{region}}", region);
}

/**
 * Get bluemix logs endpoint
 * @param {String} region
 * @return {String}
 */
Bluemix.prototype.getLogsEndpoint = function(region) {
    if (!region) {
        region = this.default_region;
    }
    return this.logs_endpoint.replace("{{region}}", region);
}

/**
 * Set bluemix containers endpoint
 * @param {String} region
 */
Bluemix.prototype.setUser = function(user) {
    this.username = user;
}

/**
 * Get bluemix logged user
 * @return {String}
 */
Bluemix.prototype.getUser = function() {
    return this.username;
}

/**
 * Set bluemix passworn
 * @param {String} pass
 */
Bluemix.prototype.setPassword = function(pass) {
    this.password = pass;
}

/**
 * Get bluemix logged password
 * @return {String}
 */
Bluemix.prototype.getPassword = function() {
    return this.password;
}

/**
 * Get bluemix token
 * @return {String}
 */
Bluemix.prototype.getToken = function() {
    return this.auth.access_token;
}

/**
 * Get bluemix tokentype
 * @return {String}
 */
Bluemix.prototype.getTokenType = function() {
    return this.auth.token_type;
}

/**
 * Get bluemix token TTL
 * @return {Integer}
 */
Bluemix.prototype.getTokenTTL = function() {
    return this.auth.token_ttl;
}

/**
 * Set bluemix token TTL. From auth info getted in login sets new TTL to relogin when necessary. It does one hour before expires
 */
Bluemix.prototype.setTokenTTL = function() {
    var now = new Date();
    var seconds_before = 0;
    if (this.auth.expires_in > 3600) {
        seconds_before = 3600;
    }
    now.setSeconds(now.getSeconds() + (this.auth.expires_in - seconds_before));
    this.auth.token_ttl = now.getTime();
}

/**
 * Exposes http functionality from module
 */
Bluemix.prototype.http = require("./utils/http")

/**
 * Exposes login function from module
 */
Bluemix.prototype.login = require("./api/login").login;

/**
 * Exposes getInfo function from module
 */
Bluemix.prototype.getInfo = require("./api/login").getInfo;

/**
 * Exposes .spaces() method to bind spaces functionality
 */
Bluemix.prototype.spaces = function() {
    var spaces = require("./api/spaces");
    spaces = new spaces(this);
    return spaces;
}

/**
 * Exposes .publicIP() method to bind public IP addresses functionality
 */
Bluemix.prototype.publicIP = function() {
    var publicIP = require("./api/public-ip");
    publicIP = new publicIP(this);
    return publicIP;
}

/**
 * Exposes .spaces() method to bind spaces functionality
 */
Bluemix.prototype.services = function() {
    var services = require("./api/services");
    services = new services(this);
    return services;
}

/**
 * Exposes .apps() method to bind apps functionality
 */
Bluemix.prototype.apps = function() {
    var services = require("./api/apps");
    services = new services(this);
    return services;
}

/**
 * Exposes .all() method to bind general functionality
 */
Bluemix.prototype.all = function() {
    var all = require("./api/all");
    all = new all(this);
    return all;
}

/**
 * Exposes .logs() method to bind logs functionality
 */
Bluemix.prototype.logs = function() {
    var logs = require("./api/logs");
    logs = new logs(this);
    return logs;
}

/**
 * Exposes .events() method to bind events functionality
 */
Bluemix.prototype.events = function() {
    var events = require("./api/events");
    events = new events(this);
    return events;
}

/**
 * Exposes .containers() method to bind containers functionality
 */
Bluemix.prototype.containers = function() {
    var containers = require("./api/containers");
    containers = new containers(this);
    return containers;
}


/**
 * Exposes .groups() method to bind groups containers functionality
 */
Bluemix.prototype.groups = function() {
    var groups = require("./api/containers-group");
    groups = new groups(this);
    return groups;
}

/**
 * Exposes .volumes() method to bind events functionality
 */
Bluemix.prototype.volumes = function() {
    var volumes = require("./api/volumes");
    volumes = new volumes(this);
    return volumes;
}

/**
 * Exposes .images() method to bind events functionality
 */
Bluemix.prototype.images = function() {
    var images = require("./api/images");
    images = new images(this);
    return images;
}


/**
 * Exposes .organizations() method to bind events functionality
 */
Bluemix.prototype.organizations = function() {
    var organizations = require("./api/organizations");
    organizations = new organizations(this);
    return organizations;
}

module.exports.Bluemix = Bluemix;