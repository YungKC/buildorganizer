"use strict"

module.exports = function () {
}


module.exports.prototype.build = function (data) {
	var result = [];
	for (let node of data) {
		var parts = node.split(':')
		if (parts.length != 2) {
			throw new Error("Found unexpected node value: " + node)
		}
		if (parts[1].length != 0) {
			if (parts[0] == parts[1]) {
				pushToResult(result, parts[0])
				continue
			}

			var foundNode = false

			for (var i=0; i<result.length; i++) {
				if (result[i] == parts[0]) {
					if (i == 0) {
						for (var j=1; j<result.length; j++) {
							if (result[j] == parts[1]) {
								throw new Error("found circular dependency for " + parts[1])
								return null;
							}
						}
						result.unshift(parts[1])
						foundNode = true
					}
					else if (result[i-1] == parts[1]) {
						continue
					}
					else {
						throw new Error("found multiple dependencies for " + parts[0])
						return null
					}
				}
				if (result[i] == parts[1]) {
					if (i == result.length-1) {
						for (var j=0; j<result.length-1; j++) {
							if (result[j] == parts[0]) {
								throw new Error("found circular dependency for " + parts[0])
								return null
							}
						}
						result.push(parts[0])
						foundNode = true
					}
					else if (result[i+1] == parts[0]) {
						continue
					}
					else {
						throw new Error("found multiple dependencies for " + parts[1])
						return null
					}
				}
			}
			if (!foundNode) {
				pushToResult(result, parts[1])
				pushToResult(result, parts[0])
			}
			console.log(result)
		}
		else {
			pushToResult(result, parts[0])
			console.log(result)
		}
	}
	console.log(result)
    return result
}

var pushToResult = function(result, node) {
	result.push(node)
}
