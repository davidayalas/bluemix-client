var request = require('request');

/**
 * Transform a key,value object into querystring
 * @param  {Object} query
 * @return {String}
 */
function querify(query) {
    if (!typeof(query) === "object") {
        return "";
    }
    var stb = [];
    for (var k in query) {
        stb.push("q=" + k + ":" + query[k]);
    }
    return stb.join("&");
}

exports.request = function(options) {
    return new Promise(function(resolve, reject) {
        try {
            request(options, function(error, response, body) {
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

exports.requestWithAuth = function(url, token_type, access_token, opts, method, resolve, reject) {
    var that = this;

    if (!method) {
        method = "GET";
    }

    var space_guid = "";

    if (opts && opts.space_guid) {
        space_guid = opts.space_guid;
    }

    if (opts && opts.organization_guid) {
        if (!opts.params) {
            opts.params = {};
        }
        opts.params.organization_guid = opts.organization_guid;
    }

    var querystring = "";

    if (opts.params) {
        querystring = querify(opts.params);
    }

    url = url.indexOf("?") > -1 ? url + "&" : url + "?";
    url = url + querystring;

    var options = {
        method: method,
        url: url,
        headers: {
            "Authorization": token_type + ' ' + access_token,
            "X-Auth-Token": access_token,
            "X-Auth-Project-Id": space_guid,
            "Accept": "application/json"
        }
    };

    if (opts && opts.form) {
        options.form = JSON.stringify(opts.form);
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    that.request(options)
        .then(
            function(result) {
                try {
                    result = JSON.parse(result);
                } catch (e) {
                    //... TODO: improve try/catch passing options.json true|false 
                }
                if (opts && opts.apply_fn) {
                    result = opts.apply_fn(result);
                }
                resolve(result);
            }
    )
        .catch(
            function(error) {
                console.log(error);
                reject(error);
            }
    )


}