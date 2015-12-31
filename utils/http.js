var request = require('request');

exports.get = function(url){
    var options = {};

    if(typeof(url)==="object"){
        options = url;
    }else{
        options.method = "GET"
        options.url = url;
    }

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

exports.getWithAuth = function(url, token_type, access_token, extra_headers){
    var that = this;
    return new Promise(function (resolve, reject) {
        var options = {
            method: 'GET',
            url: url,
            headers: {
                Authorization: token_type + ' ' + access_token,
                "X-Auth-Token": access_token
            }
        };

        if(extra_headers){
            for(var k in extra_headers){
                options.headers[k] = extra_headers[k];
            }
        }

        that.get(options)
        .then(function(results){
            resolve(results);
        })
        .catch(function(error){
            reject(error);
        });
    });
}

exports.post = function(options) {
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


