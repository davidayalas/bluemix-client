var commons = require("../utils/commons")

function all(context){
	this.ctx = context;
}

function get(that, resolve, reject, options){
	var results = {};
	var space = options.space || null;

	that.ctx.spaces().get(options)
	.then(
		function(data){
			if(data.resources.length===0){
				resolve({});
			}

			var guid = "";
			var countContainers = 1;
			if(space===null){
				countContainers = data.resources.length;
			}

			var countApps = countContainers;
			var countServices = countContainers;

			var evalPromises = function(){
				if(countContainers==0 && countApps==0 && countServices==0){
					resolve(results);
				}
			}

			var spContainers = function(opt, name){
				that.ctx.containers().get(opt).then(
				  	function(cont){
						results[name].containers = cont;
						countContainers--;
						evalPromises();
		  			}
		  		).catch(function(error){
		  			countContainers--;
		  			evalPromises();
					results[name].containers = [];
					console.log(error)
		  		});  			
			}

			var spApps = function(opt, name){
				that.ctx.apps().get(opt).then(
				  	function(apps){
						results[name].apps = apps.resources;
						countApps--;
						evalPromises();
		  			}
		  		).catch(function(error){
		  			countApps--;
		  			evalPromises();
					results[name].apps = [];
					console.log(error)
		  		});		
			}

			var spServices = function(opt, name){
				that.ctx.services().get(opt).then(
				  	function(services){
						results[name].services = services.resources;
						countServices--;
						evalPromises();
		  			}
		  		).catch(function(error){
		  			countServices--;
		  			evalPromises();
					results[name].services = [];
					console.log(error)
		  		});
			}

			var found = false;
			for(var i=0;i<data.resources.length;i++){
				if(space===null || ((space!==null || space!=="") && space===data.resources[i].entity.name)){
		  			found = true;
		  			results[data.resources[i].entity.name] = {};
		  			results[data.resources[i].entity.name].guid = data.resources[i].metadata.guid;
					spContainers({space : data.resources[i].entity.name, region : options.region}, data.resources[i].entity.name);
					spApps({space : data.resources[i].entity.name, region : options.region}, data.resources[i].entity.name);
					spServices({space : data.resources[i].entity.name, region : options.region}, data.resources[i].entity.name);
		  			if((space!==null || space!=="") && space===data.resources[i].metadata.name){
						break;
					}
				}
			}

			if(!found){
				reject('{"error":"invalid space"}');
			}
		}
	)
	.catch(
		function(reason){
			reject(reason);
		}
	);
}

all.prototype.get = function(options){
	var that = this;
    return new Promise(function (resolve, reject) {
		commons.getData(that, resolve, reject, get, options)
	});
}	

module.exports = all;