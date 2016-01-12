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
		      bluemix.apps().get({space : req.params.space, region : req.params.region, params : req.query})
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
	* .create({region, form : {organization_guid, name}})
	* .delete({region, guid})

* .apps()

	* .getAll({region, space, params})
	* .get({region, space, app, params})

* .services()

	* .getAll({region, space, params})

* .containers()

	* .getAll({region, space})
	* .get({region, space, container})
	* .start({container, region, guid}) //guid = space guid
	* .stop({container, region, guid})
	* .pause({container, region, guid})
	* .unpause({container, region, guid})
	* .restart({container, region, guid})
	* .delete({container, region, guid})


* .groups()

	* .getAll({region, space})
	* .get({region, space, group})

* .volumes()

	* .getAll({region, space})

* .logs()

	* .apps({region, space, app})
	* .containers({region, space, container})

* .events()

	* .apps({region, type})
	* .services({region, type})

	type = create | delete | update

* .all()

    * .get({region, space}) : all services, apps and containers for a space
    * .get({region}) : all services, apps and containers for all spaces



# TODO: implement more services and methods