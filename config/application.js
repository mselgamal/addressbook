let enviroment = process.env.NODE_ENV,
	path = require('path'),
	express = require('express');

global.App = {
	started: false,
	app: express(),
	httpPort: process.env.HTTP_PORT || 8080,
	dbPort: process.env.DB_PORT || 9090,
	root: path.join(__dirname,'..'),
	appPath: function(path){return this.root + "/" + path;},
	require: function(path){return require(this.appPath(path));},
	env: enviroment,
	start: function() {
		if (!this.started) {
			this.started = true;
			this.app.listen(this.httpPort);
			console.log("AddressBook app, http port " + this.httpPort + " elastic port " + this.dbPort);
		} else {
			console.log("AddressBook app is already running");
		}
	},
	route: function(route) {
		return this.require("addressbook/routes/"+route);
	}
};

let contactRoutes = App.require('addressbook/routes/contact-routes'), 
	contactHandler = App.require('addressbook/handlers/contact-handler'), 
	contactRouter = express.router();
App.app.use(contactRouter);
contactRoutes(contactRouter,contactHandler);