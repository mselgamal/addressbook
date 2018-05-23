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
	verify contact fields, then update contact's name, email, number or address
	return promise
*/
function update(name,params) {
	let keys = Object.keys(params);
	let data = {};
	try {
		verify.verifyName(name);
		for (let k of keys) {
			if (k === 'email')
				data.email = verify.verifyEmail(params.email);
			else if (k === 'number')
				data.number = verify.verifyNumber(params.number);
			else if (k === 'address')
				data.address = verify.verifyNumber(params.address);
			else if (k === 'name')
				data.name = verify.verifyName(params.name);
		}
	} catch(err) {
		return new Promise((resolve,reject)=>{
			reject(new Error(err.message));
		});
	}

	return client.update({
		index: indexName,
		type: "contact",
		id: name,
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

/*
	make search call then analyze result 
	if page > # of pages in the query
	return [0...n], where n is number of pages
	if page < # of pages, return [page...n]
	otherwise return []
*/
function query(pageSize,page,queryString,callBack){
	search(queryString).then((res)=>{
		pageSize = Number(pageSize), page = Number(page);
		let hits = res.hits.hits, result = [];
		console.log(hits);
		if (res.hits.total > 0) {
			let remainder = hits.reduce((acc,ele)=>{
				//console.log(ele)
				acc.push(ele);
				if (acc.length === pageSize){
					result.push(acc);
					acc = []; 
				}
				return acc;
			},[]);

			if (remainder.length !== 0)
				result.push(remainder);

			if (result.length >= page)
				result = result.slice(page-1,result.length);
		}
		callBack({hits:result});
	}).catch((err)=>{
		console.log(err);
		callBack({error:err.message});
	});
}

//make search call, return promise
function search(queryString) {
	return client.search({
		index: indexName,
		type: "contact",
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
exports.query = query;