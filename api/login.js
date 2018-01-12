var Promise = require('bluebird');
var http = require("../utils/http")

/**
 * Login into Bluemix API
 * @param  {String} username
 * @param  {String} password
 * @return {String}
 */
exports.login = function(username, password) {
    var endpoint = this.getEndpoint();
    this.setUser(username);
    this.setPassword(password);
    var that = this;

    return new Promise(function(resolve, reject) {
        that.getInfo()

        .then(function() {
            var url = that.info.authorization_endpoint + "/oauth/token";
            var options = {
                method: 'POST',
                url: url,
                headers: {
                    Authorization: 'Basic Y2Y6',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    grant_type: "password",
                    client_id: "cf",
                    username: username,
                    password: password
                }
            };

            http.request(options)

            .then(
                function(data) {
                    that.auth = JSON.parse(data);
                    that.setTokenTTL();
                    resolve("logged");
                }
            )

            .catch(
                function(error) {
                    reject(error);
                }
            );
        });
    });

};

/**
 * Get basic info from Bluemix API like endpoints
 * @return {JSON}
 */
exports.getInfo = function() {
    var endpoint = this.getEndpoint();
    var that = this;
    return new Promise(function(resolve, reject) {
        http.request({
            url: endpoint + "/v2/info"
        })
            .then(function(data) {
                that.info = JSON.parse(data);
                var logging_endpoint = that.info.logging_endpoint || that.info.doppler_logging_endpoint;
                that.logs_endpoint = logging_endpoint.replace("wss", "https").replace(":443", "").replace("\.ng\.", ".{{region}}.");
                resolve(data);
            })
            .catch(function(error) {
                console.error(error)
                reject(error);
            });
    });

}