let contact = require('../src/contact');

function testScript1() {
	let data = {
		name:'horton',
		number: '2487878187',
		address:'6000 funland street MD',
		email: ''
	};
	
	console.log("Test script 1: create -> delete\n");
	console.log("contact:\n");
	console.log(data);
	callCreate(data).then((res)=>{
		if (res.result && res.result === "created") {
			console.log("\nCreate\n");
			console.log(res);
			return callDelete(data.name);
		} else {
			throw new Error;
		}
	}).then((res)=>{
		console.log("\nDelete\n");
		console.log(res);
		console.log("\nTest2 Successful\n");
	}).catch((err)=>{
		console.log("Test Script Failed\n");
		console.log(err.message+"\n");
		console.log(err);
	});
}

function callCreate(data){
	return contact.create(data);
}

function callDelete(name){
	return contact.delete(name);
}

testScript1();