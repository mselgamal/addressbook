let contact = require('../src/contact');

function testScript2() {
	let data = {
		name:'sim',
		number: '2487878187',
		address:'6000 bedford ln, clinton MD 20835',
	};
	
	console.log("Test script 2: create -> get -> delete\n");
	console.log("contact:\n");
	console.log(data);
	callCreate(data).then((res)=>{
		if (res.result && res.result === "created") {
			console.log("\nCreate\n");
			console.log(res);
			return callGet(data.name);
		} else {
			throw new Error;
		}
	}).then((res)=>{
		console.log("\nGet\n");
		console.log(res);
		return callDelete(data.name);
	}).then((res)=>{
		console.log("\nDelete\n");
		console.log(res);
		console.log("\nTest Script Succesful\n");
	}).catch((err)=>{
		console.log("Test Script Failed\n");
		console.log("Error: "+err.message+"\n");
	});
}

function callCreate(data){
	return contact.create(data);
}

function callGet(name){
	return contact.get(name);
}

function callDelete(name){
	return contact.delete(name);
}

testScript2();