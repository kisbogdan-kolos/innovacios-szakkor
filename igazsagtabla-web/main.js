function solve(input) {

	var variables = [];

	if (input === undefined) {
		input = "";
	}

	for (var i = 0; i < input.length; i++) {
		var char = input[i];
		if (char == char.toUpperCase() && char != char.toLowerCase()) {
			if (!variables.includes(char)) {
				variables.push(char);
			}
		}
	}

	var out = [variables.filter(a => true)];
	out[0].push(input);

	for (var i = 0; i < 2 ** variables.length; i++) {
		var currentVal = [];
		for (var n = 0; n < variables.length; n++) {
			currentVal[variables.length - n - 1] = Math.floor(i / 2 ** n) % 2 == 1;
		}

		var modInput = input.split("");
		modInput.forEach((item, index) => {
			if (variables.includes(item)) {
				modInput[index] = currentVal[variables.indexOf(item)];
			}
		});

		var didSomething = true;
		while (didSomething) {
			didSomething = false;
			modInput.forEach((char, index) => {
				switch (char) {
					case "n":
						if (typeof modInput[index + 1] == "boolean") {
							modInput[index + 1] = !modInput[index + 1];
							modInput.splice(index, 1);
							didSomething = true;
						}
						break;
					case "a":
						if (typeof modInput[index + 1] == "boolean" && typeof modInput[index - 1] == "boolean") {
							modInput[index - 1] = modInput[index + 1] && modInput[index - 1];
							modInput.splice(index, 2);
							didSomething = true;
						}
						break;
					case "o":
						if (typeof modInput[index + 1] == "boolean" && typeof modInput[index - 1] == "boolean") {
							modInput[index - 1] = modInput[index + 1] || modInput[index - 1];
							modInput.splice(index, 2);
							didSomething = true;
						}
						break;
					case "x":
						if (typeof modInput[index + 1] == "boolean" && typeof modInput[index - 1] == "boolean") {
							modInput[index - 1] = (modInput[index + 1] || modInput[index - 1]) && !(modInput[index + 1] && modInput[index - 1]);
							modInput.splice(index, 2);
							didSomething = true;
						}
						break;
					case "i":
						if (typeof modInput[index + 1] == "boolean" && typeof modInput[index - 1] == "boolean") {
							modInput[index - 1] = !modInput[index - 1] || (modInput[index + 1] && modInput[index - 1]);
							modInput.splice(index, 2);
							didSomething = true;
						}
						break;
					case "e":
						if (typeof modInput[index + 1] == "boolean" && typeof modInput[index - 1] == "boolean") {
							modInput[index - 1] = modInput[index + 1] == modInput[index - 1];
							modInput.splice(index, 2);
							didSomething = true;
						}
						break;
					default:
						break;
				};
			});
		}

		var sOut = currentVal;

		if (modInput.length == 1 && typeof modInput[0] == "boolean") {
			sOut.push(modInput[0]);
		}
		else {
			sOut.push(null);
		}
		out.push(sOut);
	}

	return out;
}

var http = require('http');
var fs = require('fs')

http.createServer(function (req, res) {
	try {
		var parameters = req.url.split("/");
		var firstParam = parameters[1].split("?");

		switch (firstParam[0]) {
			case "solve":
				res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
				var toSolve = firstParam[1].split("=")[1];
				res.write(JSON.stringify(solve(toSolve)));
				break;
			case "index":
				res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
				res.write(fs.readFileSync('index.html'));
				break;
			default:
				res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
				res.write("Nótfáund!!!!");
				break;
		}
	} catch (err) {
		console.log(err);
		res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
		res.write("Számtíng vent róng!");
	}

	res.end();
}).listen(8080);