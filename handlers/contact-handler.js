let contact = require('../src/contact');

//handler for GET /contact?pageSize={}&page={}&query={}
function getContacts(req,res) {
	res.setHeader("Content-Type","application/json");
	contact.query(req.query.pageSize,req.query.page,req.query.query,(result)=>{
		res.send(result);
	});
}

//handler for GET /contact/{name}
function getContact(req,res) {
	res.setHeader("Content-Type","application/json");
	contact.get(req.params.name).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send({error:err.message});
	});
}

//handler for POST /contact
function createContact(req,res) {
	res.setHeader("Content-Type","application/json");
	contact.create(req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send({error:err.message});
	});
}

//handler for PUT /contact/{name}
function updateContact(req,res) {
	res.setHeader("Content-Type","application/json");
	contact.update(req.params.name,req.body).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send({error:err.message});
	});
}

//handler for DELETE /contact/{name}
function deleteContact(req,res) {
	res.setHeader("Content-Type","application/json");
	contact.delete(req.params.name).then((result)=>{
		res.send(result);
	}).catch((err)=>{
		res.send({error:err.message});
	});
}

exports.getContacts = getContacts;
exports.getContact = getContact;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;