var http = require("../utils/http")

/**
 * Search space name in spaces and returns its guid
 * @param  {Object} spaces
 * @param  {String} string 
 * @return {String}
 */
function searchSpace(spaces, _space){
	var guid = "";
	for(var i=0, z=spaces.resources.length;i<z;i++){
		if(spaces.resources[i].entity.name===_space){
			guid = spaces.resources[i].metadata.guid;
			break;
		}
	}
	if(guid===""){
		return {"error":"invalid space"};
	}else{
		return guid;
	}
}

/**
 * Transform a key,value object into querystring
 * @param  {Object} query
 * @return {String}
 */
function querify(query){
	if(!typeof(query)==="object"){
		return "";
	}
	var stb=[];
	for(var k in query){
		stb.push(k+"="+query[k]);
	}
	return stb.join("&");
}

/**
 * Cleans data from Bluemix API to simplify it 
 * @param  {Object} json
 * @return {Object}
 */
function cleanResults(json){
	if(!typeof(json)==="object" || !json.resources){
		return json;
	}

	for(var i=0,z=json.resources.length;i<z;i++){
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
}

/**
 * Cleans data from Bluemix Container API to simplify it 
 * @param  {Object} json
 * @return {Object}
 */
function cleanResultsC(json){
	if(!typeof(json)==="object"){
		return json;
	}

	for(var i=0,z=json.length;i<z;i++){
		delete json[i].Command;
		delete json[i].Created;
		delete json[i].SizeRootFs;
		delete json[i].SizeRw;
		delete json[i].Started;
	}
}

/**
 * Replaces {{variable}} strings in the urls passed to getUrl function with the options["variable"] setted
 * @param  {String} url
 * @param  {Object} options
 * @return {String}
 */
function replaceVariablesInURL(url, options){
	var param = /\{\{(.*?)\}\}/g;
	var match = param.exec(url);
	while(match!==null){
		url = url.replace(match[0],options[match[1]]);
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
function getData(that, resolve, reject, fn, options){
	if(new Date()>=that.ctx.getTokenTTL()){
		console.info("refreshing login")
		that.ctx.login(that.ctx.getUser(), that.ctx.getPassword())
		.then(
			function(){
				fn(that, resolve, reject, options)
			}
		)
	}else{
		fn(that, resolve, reject, options)
	}
}

/**
 * Wrapper function to make generic the "GET" of url from Bluemix API
 * @param  {String} url 
 * @param  {Object} that   [Bluemix instance]
 * @param  {Function} resolve 
 * @param  {Function} reject 
 * @param  {Object} options 
 * @param  {Object} extra_headers [for bluemix container API] 
 * @return {JSON or text}
 */
function getUrl(url, that, resolve, reject, options, extra_headers){
	var results = [];

	that.ctx.spaces().getAll(options)

	.then(
		function(spaces){
			var c_opt = options;
			c_opt.space = searchSpace(spaces, c_opt.space);
			return c_opt;
		}
	)

	.then(
		function(c_opt){
			if(c_opt.space && c_opt.space.error){
				reject(c_opt.space);
			}

			if(extra_headers && extra_headers["X-Auth-Project-Id"]){ //containers API
				extra_headers["X-Auth-Project-Id"] = c_opt.space;
			}
			var querystring = "";
			if(c_opt.params){
				querystring = "?" + querify(c_opt.params);
			}

			http.requestWithAuth(replaceVariablesInURL(url, c_opt) + querystring, that.ctx.getTokenType(),that.ctx.getToken(), extra_headers)
			
			.then(function(results){
				try{
					results = JSON.parse(results);
					if(extra_headers && extra_headers["X-Auth-Project-Id"]){ //containers API
						cleanResultsC(results);
					}else{
						cleanResults(results);
					}
				}catch(e){
					//... TODO: improve try/catch passing options.json true|false 
				}
				if(options.apply_fn){
					results = options.apply_fn(results);
				}
				resolve(results);
			})
			
			.catch(function(error){
				reject(error);
			});				
		}
	).catch(function(error){
		reject(error);
	})
}

exports.getData = getData;
exports.searchSpace = searchSpace;
exports.querify = querify
exports.cleanResults = cleanResults
exports.cleanResultsC = cleanResultsC
exports.getUrl = getUrl;
