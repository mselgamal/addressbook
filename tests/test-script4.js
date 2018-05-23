let contact = require('../src/contact');

function testScript2() {
	let data = {
		name:'b',
		number: '2487878187',
		address:'6000 funland street MD',
		email: 'xyz10@gmail.com'
	};
	
	console.log("Test script 2: detect invalid name, number and email\n");
	console.log(data);
	callCreate(data).then((res)=>{
		console.log("Test Script Failed\n"); 
	}).catch((err)=>{
		console.log("\nError: "+err.message+"\n");
		data.name = 'bob';
		data.number = '24878781';
		return callCreate(data);
	}).then((res)=>{
		console.log("Test Script Failed\n"); 
	}).catch((err)=>{
		console.log(data);
		console.log("\nError: "+err.message+"\n");
		data.number = '2487878187';
		data.email = 'x@gmail.com';
		return callCreate(data);
	}).then((res)=>{
		console.log("Test Script Failed\n"); 
	}).catch((err)=>{
		console.log(data);
		console.log("\nError: "+err.message+"\n");
		console.log("Test Script Successful\n");
	})
}

function callCreate(data){
	return contact.create(data);
}

testScript2();