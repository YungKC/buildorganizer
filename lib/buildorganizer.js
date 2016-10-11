"use strict"

module.exports = function () {
}


module.exports.prototype.build = function (data) {
	var result = [];
	for (let node of data) {
		var parts = node.split(':')
		if (parts.length > 2) {
			return null
		}
		if (parts.length == 2 && parts[1].length != 0) {
			if (parts[0] == parts[1]) {
				pushToResult(result, parts[0])
				continue
			}
			if (result[0] == parts[0]) {
				for (var i=1; i<result.length; i++) {
					if (result[i] == parts[1]) {
						return null
					}
				}
				result.unshift(parts[1])
				continue
			}
			else if (result[result.length-1] == parts[1]) {
				for (var i=0; i<result.length-1; i++) {
					if (result[i] == parts[0]) {
						return null
					}
				}
				result.push(parts[0])
				continue
			}
			else if (result[0] == parts[1]) {
				if (result[1] != parts[0]) {
					return null
				}
			}
			else if (result[result.length-1] == parts[0]) {
				if (result[result.length-2] != parts[1]) {
					return null
				}
			}
			result.push(parts[1])
		}
		pushToResult(result, parts[0])
		console.log(result)
	}
	console.log(result)
    return result
}

var pushToResult = function(result, node) {
	result.push(node)
}
