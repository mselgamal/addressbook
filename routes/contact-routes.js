
/*
	given a router and handler, determine the type
	of http request recieved and apply the correct
	handler
*/
function routes(router,handler) {
	
	router.route('/contact')
		.get(handler.getContacts)
		.post(handler.createContact);
	
	router.route('/contact/:name')
		.get(handler.getContact)
		.put(handler.updateContact)
		.delete(handler.deleteContact);
}

exports.routes = routes;