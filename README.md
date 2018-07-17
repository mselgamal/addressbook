Address Book API

	Spec Definition

	The form of the endpoint spec will be defined as:

	VERB /path/{pathParam}/subpath?queryParam={}

	The VERB is part of the HTTP spec and can be defined as GET, POST, PUT, DELETE (and a few others).  We will only be using the ones specified.

	The path definition defines the URL path that we expect the api to be tied to.  

	{pathParam} defines a variable element that should be interpreted by the API.  As an example:

	Given the simple spec:

	GET /user
	GET /user/{name}

	These endpoints would allow for the following URL paths:

	/user
	/user/bob
	/user/jane
	/user/sam

	Additionally query parameters (?key=value) should be interpreted similarly but in the query string (everything after the ? in the URL).

	Each endpoint should have a defined input and output, and should make sense to the person using it.



	API Definition

	So for this API, the endpoints (aka methods) that we want in the api are as follows:

	GET /contact?pageSize={}&page={}&query={}

	This endpoint will providing a listing of all contacts, you will need to allow for a defined pageSize (number of results allowed back), and the ability to offset by page number to get multiple pages. Query also should be a query for queryStringQuery as defined by Elasticsearch that you can pass directly in the Elasticsearch call.

	POST /contact

	This endpoint should create the contact.  Given that name should be unique, this may need to be enforced manually.  

	GET /contact/{name}

	This endpoint should return the contact by a unique name. This name should be specified by the person entering the data.  

	PUT /contact/{name}

	This endpoint should update the contact by a unique name (and should error if not found)

	DELETE /contact/{name}

	This endpoint should delete the contact by a unique name (and should error if not found)

	Testability
	The application you build should be testable.  It should be structured in a way to allow for easy verification of all logic (think functions vs methods).


# addressbook
address book api
Nodejs,express,elasticsearch

contact structure:
	
	{
		name: '',
		number: '',
		email: '',
		address: ''
	}

Running elastisearch:

	- elasticsearch-6.2.4/bin/easticsearch to run a elasticsearch instance

Running the application:
	- node appl.js, uses default port 8080 for http and 9200 for elasticsearch and sets ES logging to info
	
	- LOG=trace HTTP_PORT=xxx ES_PORT=xxx node app.js, to change ES port, http port and logging
	
	- /tests contains test-scripts, run as node test-scriptX.js (you can set ports etc like above) 

assumptions:
	
	- you can create a contact with only name field, remaining fields are set to '' by default
	
	- regarding the query request. If page > # of possible pages, then i just return [0...n] n = num of possible pages. My understanding of 'page': it's basically an offset, i.e p1,p2,p3...pn if page = p2, then i return [p2...pn]

missing functionality:
	
	- i'm not using mocha for unit testing, just didnt have enough time to set it up. I created some test scripts that test functionality and print some relevant output to console.
	
	- i didnt prepare a proper test script for the query request, i tested it manually in a crude way. I had trouble creating a bunch of contacts then doing a query right after, for some reason the contacts wouldn't show up. But other contacts created outside the script, displayed as expected. 
