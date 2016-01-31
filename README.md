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

	* .getAll({region[, organization_guid][, params : {param:value}]})
	* .get({region, space_guid[, params : {param:value}]})
	* .create({region, form : {organization_guid, name}})
	* .delete({region, space_guid})

	Valid params: name, developer_guid, app_guid

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

* .images()

	* .getAll({region, space_guid})
	* .get({region, space_guid, image})
	* .validate({region, space_guid, image, name}) // image or name. image = id, name = full path name of the image, including registry and namespace. 
	* .validateSummary({region, space_guid, image, name}) // it will return last analysis
	* .delete({region, space_guid, image})

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

# Tips

- Image Validation Service

The response from the image validation service is tricky to process in order to get if an image is vulnerable or not. The .images().validateSummary() returns a clear JSON with the vulnerabilities and if the attribute "vulnerable" set to true or false.

		{
			_score: 7.958448,
			_type: "vulnerabilityscan",
			_id: "tm12fk4yQD6g9gyNSlwueA",
			_source: {
				total_usns_for_distro: 499,
				description: "Overall vulnerability status",
				vulnerable_packages: 4,
				timestamp: "2016-01-18T13:35:13+0000",
				@timestamp: "2016-01-18T13:35:18.404Z",
				namespace: "registry.eu-gb.bluemix.net/xxxxxx/myimage:tag",
				vulnerable_usns: 3,
				os_distrbution: "ubuntu",
				os_version: "trusty",
				crawled_time: "2016-01-18T13:35:13+0000",
				total_packages: 232,
				@version: "1",
				vulnerable: true,
				uuid: "3d0f9dc4-bde8-11e5-aee5-0242ac113ff3"
			},
			_index: "vulnerabilityscan-2016.01.18",
			vulnerabilities: [
				{
					url: "http://www.ubuntu.com/usn/usn-2861-1",
					usnid: "usn-2861-1",
					summary: "libpng could be made to crash or run programs as your login if it opened aspecially crafted file."
				},
				{
					url: "http://www.ubuntu.com/usn/usn-2865-1",
					usnid: "usn-2865-1",
					summary: "GnuTLS could be made to expose sensitive information over the network."
				},
				{
					url: "http://www.ubuntu.com/usn/usn-2868-1",
					usnid: "usn-2868-1",
					summary: "DHCP server, client, or relay could be made to crash if they receivedspecially crafted network traffic."
				}
			]
		}
