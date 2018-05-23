
/* 
a name is atleast two alphabets and no more than 32
return name when valid or throw exception	
*/
function verifyName(name) {
	let regex = RegExp(/^[\w][\w][\w\s]{0,30}$/);
	if (regex.test(name))
		return name;
	throw new Error("invalid name");
}

/* 
a phone number matches ZYXXXXXXXXX format, where z = 1 and optional
Y is between [2,9] and x is between [0,9]
return '' when number is undef
or
return number when valid
otherwise throw exception	
*/
function verifyNumber(number) {
	let regex = RegExp(/^1?[2-9][0-9]{9}$/);
	if (!number)
		return '';
	else if (regex.test(number))
		return number;
	throw new Error("invalid number");
}

/* 
an address is between 10 and 50 characters
return address when valid or throw exception	
*/
function verifyAddress(address) {
	let regex = RegExp(/^[\d\w\s\,]{10,50}$/);
	if (!address)
		return '';
	else if (regex.test(address))
		return address;
	throw new Error("invalid address");
}

/* 
an email must begin with {3,4} alphabets, then 
a combiniation of alphabets and digits no more than 15
return email when valid or throw exception	
*/
function verifyEmail(email) {
	let regex = RegExp(/^[\w]{3,4}[\w\d-]{0,15}@[\w-]{2,15}\.[\w]{3}$/);
	if (!email)
		return '';
	else if (regex.test(email))
		return email;
	throw new Error("invalid email");
}

exports.verifyName = verifyName;
exports.verifyNumber = verifyNumber;
exports.verifyAddress = verifyAddress;
exports.verifyEmail = verifyEmail;