# Bluemix client

The client idea is based in [cf-nodejs-client](https://www.npmjs.com/package/cf-nodejs-client) but I don't need some parts and I wanted to play a little with Bluemix API and Node.js.

Also, I need access to Container API and the cf client doesn't provide it, for now.

# Install

		npm install bluemix-client --save

# Basic usage

		var bluemix = require("bluemix-client").Bluemix;
		bluemix = new bluemix();

		bluemix.login("username","password")

		.then(function(state){
			if(state==="logged"){
				
		      bluemix.spaces().get({region : req.params.region, params : req.query}) //you can pass pagination info
		      .then(
		        function(data){
		            console.log(data)
		        }
		      )  
		      .catch(function (reason) {
		            console.log(reason);
		      });
		      
		      //bluemix.services().get({})
		      //bluemix.containers().get({})
		      bluemix.apps().get({space_guid : req.params.space, region : req.params.region, params : req.query})
		      .then(
		        function(data){
		            console.log(data)
		        }
		      )  
		      .catch(function (reason) {
		            console.log(reason);
		      });

			}else{
				//...
			}
		})

		.catch(function(error){
			//...
		});

# Notes

* If you implement a REST API with this client, you can forget about refresh token when it expires: the client does it automatically

# Methods

* .organizations()

	* .getAll({region})

* .spaces()

	* .getAll({region, params})
	* .get({region, params, space_guid})
	* .create({region, form : {organization_guid, name}})
	* .delete({region, space_guid})

* .apps()

	* .getAll({region, space_guid, params})
	* .get({region})

* .services()

	* .getAll({region, space_guid, params})

* .containers()

	* .getAll({region, space_guid})
	* .get({region, space_guid, container})
	* .start({container, region, space_guid}) 
	* .stop({container, region, space_guid})
	* .pause({container, region, space_guid})
	* .unpause({container, region, space_guid})
	* .restart({container, region, space_guid})
	* .delete({container, region, space_guid})

* .groups()

	* .getAll({region, space_guid})
	* .get({region, space_guid, group})
	* .delete({region, space_guid, group})
	* .update(region, space_guid, group, form : {NumberInstances: {Desired, Min, Max}, Autorecovery}) 
		- http://ccsapi-doc.mybluemix.net/#!/Container_Groups/patch_containers_groups_name_or_id

* .volumes()

	* .getAll({region, space_guid})

* .logs()

	* .apps({region, space_guid, app})
	* .containers({region, space_guid, container})

* .events()

	* .apps({region, type})
	* .services({region, type})

	type = create | delete | update

* .all()

    * .get({region, space_guid}) : all services, apps and containers for a space
    * .get({region}) : all services, apps and containers for all spaces



# TODO:
- implement more services and methods
- add organization_guid as filter