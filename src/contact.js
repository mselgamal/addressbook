let client = require('./client.js').client;
let verify = require('./utils.js');
let indexName = "addressbook";

/*
	verfiy contact fields, then create a contact
	contact structure:
	{
		name:'',
		email:'',
		number:'',
		address:''
	}
	return promise
*/
function create(params) {
	let data = {};
	try {
		data = {
			name: verify.verifyName(params.name),
			email: verify.verifyEmail(params.email),
			number: verify.verifyNumber(params.number),
			address: verify.verifyAddress(params.address)
		};
	} catch(err) {
		return new Promise((resolve,reject)=>{
			reject(new Error(err.message));
		});
	} 

	return client.create({
		index: indexName,
		type: "contact",
		id: params.name,
		body: data
	});
}

/*
	verify contact fields, then update contact's email, number or address
	return promise
*/
function update(params) {
	let keys = Object.keys(params);
	let data = {};
	try {
		verify.verifyName(params.name);
		for (let k of keys) {
			if (k === 'email')
				data.email = verify.verifyEmail(params.email);
			else if (k === 'number')
				data.number = verify.verifyNumber(params.number);
			else if (k === 'address')
				data.address = verify.verifyNumber(params.address);
		}
	} catch(err) {
		return new Promise((resolve,reject)=>{
			reject(new Error(err.message));
		});
	}

	return client.update({
		index: indexName,
		type: "contact",
		id: params.name,
		body: {
			doc: data
		}
	});
}

//delete a contact, return promise
function del(name) {
	return client.delete({
		index: indexName,
		type: "contact",
		id: name
	});
}

//retrieve a contact, return promise
function get(name) {
	return client.get({
		index: indexName,
		type: "contact",
		id: name
	});
}

function search(queryString) {
	return client.search({
		index: indexName,
		body: {
			query: {
				query_string: {
					query: queryString
				}
			}
		}
	});
}

exports.create = create;
exports.update = update;
exports.delete = del;
exports.get = get;
exports.search = search;