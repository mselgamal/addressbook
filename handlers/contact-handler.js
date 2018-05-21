function getContacts(req,res) {
	res.setHeader("Content-Type"."application/json");
	res.send("{}");
}

function getContact(req,res) {
	res.setHeader("Content-Type"."application/json");
	res.send("{}");
}

function createContact(req,res) {
	res.status(200).send(true);
}

function updateContact(req,res) {
	res.status(200).send(true);
}

function deleteContact(req,res) {
	res.status(200).send(true);
}

exports.getContacts = getContacts;
exports.getContact = getContact;
exports.createContact = createContact;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;