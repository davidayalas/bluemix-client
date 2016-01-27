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
	if(options.image){
		options.form.id = options.image;
		delete options.image;
	}else if(options.name){
		options.form.name = options.name;
		delete options.name;
	}

    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/containers/images/validate", this, options, "POST");
}

images.prototype.delete = function(options) {
    return commons.requestWrapper(this.ctx.getContainersEndpoint(options.region) + "/images/" + options.image, this, options, "DELETE");
}

module.exports = images;