var input = process.argv[2];

var variables = [];

for (var i = 0; i < input.length; i++) {
	var char = input[i];
	if (char == char.toUpperCase() && char != char.toLowerCase()) {
		if (!variables.includes(char)) {
			variables.push(char);
		}
	}
}

for (var i = 0; i < 2 ** variables.length; i++) {
	var currentVal = [];
	for (var n = 0; n < variables.length; n++) {
		currentVal[variables.length - n - 1] = Math.floor(i / 2 ** n) % 2;
	}
	
	var modInput = input.split("");
	modInput.forEach((item, index) => {
		if (variables.includes(item)){
			modInput[index] = currentVal[variables.indexOf(item)];
		}
	});

	console.log(modInput);
}