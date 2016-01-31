var http = require("../utils/http")
var commons = require("../utils/commons")

function images(context) {
    this.ctx = context;
}

images.prototype.getAll = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/images/json", this, options);
}

images.prototype.get = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/images/" + options.image + "/json", this, options);
}

images.prototype.validate = function(options) {

    options.form = {};
    if (options.image) {
        options.form.id = options.image;
        delete options.image;
    } else if (options.name) {
        options.form.name = options.name;
        delete options.name;
    }

    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/images/validate", this, options, "POST");
}

images.prototype.validateSummary = function(options) {
    var that = this;

    return new Promise(function(resolve, reject) {

        that.validate(options)
            .then(

                //Get last analysis and vulnerabilities
                function(data) {
                    var lastHit = {
                        _source: {
                            "@timestamp": "0"
                        }
                    };

                    var vulnerabilities = {};

                    for (var i = 0, z = data.hits.hits.length; i < z; i++) {
                        if (!vulnerabilities[data.hits.hits[i]._source.uuid]) {
                            vulnerabilities[data.hits.hits[i]._source.uuid] = [];
                        }
                        if (data.hits.hits[i]._source.vulnerabilities) {
                            vulnerabilities[data.hits.hits[i]._source.uuid].push(data.hits.hits[i]._source.vulnerabilities);
                        }
                        if (data.hits.hits[i]._source.total_usns_for_distro && (lastHit._source["@timestamp"] < data.hits.hits[i]._source["@timestamp"])) {
                            lastHit = data.hits.hits[i];
                        }
                    }

                    var usnid = {};
                    lastHit.vulnerabilities = [];
                    for (var i = 0; i < vulnerabilities[lastHit._source.uuid].length; i++) {
                        for (var z = 0; z < vulnerabilities[lastHit._source.uuid][i].length; z++) {
                            if (!usnid[vulnerabilities[lastHit._source.uuid][i][z].usnid]) {
                                lastHit.vulnerabilities.push(vulnerabilities[lastHit._source.uuid][i][z]);
                            }
                            usnid[vulnerabilities[lastHit._source.uuid][i][z].usnid] = "-";
                        }
                    }
                    resolve(lastHit);
                }
        )
            .catch(function(error) {
                reject(error);
            });

    });
}



images.prototype.delete = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/images/" + options.image, this, options, "DELETE");
}

module.exports = images;