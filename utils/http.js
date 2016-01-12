var request = require('request');

exports.request = function(options) {
    return new Promise(function (resolve, reject) {
        try {
            request(options, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                return resolve(body);
            });

        } catch (error) {
            return reject(error);
        }
    });
};

exports.requestWithAuth = function(url, token_type, access_token, extra_headers, form, method){
    var that = this;

    if(!method){
        method = "GET";
    }

    var options = {
        method: method,
        url: url,
        headers: {
            Authorization: token_type + ' ' + access_token,
            "X-Auth-Token": access_token
        }
    };

    if(form!==null && form!==undefined && form!=="undefined"){
        options.form = JSON.stringify(form);
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if(extra_headers){
        for(var k in extra_headers){
            options.headers[k] = extra_headers[k];
        }
    }
    
    return that.request(options)
}
