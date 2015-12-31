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

# GET methods

* .spaces()

	* .get({region, params})

* .apps()

	* .get({region, space, params})
	* .getApp({region, space, app, params})

* .services()

	* .get({region, space, params})

* .containers()

	* .get({region, space, params})

* .logs()

	* .apps({region, space, app})
	* .containers({region, space, container})

* .all()

    * .get({region, space}) : all services, apps and containers for a space
    * .get({region}) : all services, apps and containers for all spaces

# TODO: post, put, delete