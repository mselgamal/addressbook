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
