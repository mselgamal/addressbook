function contactRoutes(router,handler) {
	router.get('/contact',handlers.getContact);
}

exports.contactRoutes = contactRoutes;