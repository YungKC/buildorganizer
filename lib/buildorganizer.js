"use strict"

module.exports = function () {
}


module.exports.prototype.build = function (data) {
	debugger
	var result = [];
	for (let node of data) {
		var parts = node.split(': ')
		if (parts.length != 2) {
			throw new Error("Found unexpected node value: " + node)
		}
		var childNode = parts[0].trim()
		var parentNode = parts[1].trim()
		if (childNode.length == 0) {
			throw new Error("Found unexpected node value: " + node)
		}
		if (childNode == parentNode) {
			throw new Error("Found unexpected node value: " + node)
		}

		var foundChild = false
		for (var i=0; i<result.length; i++) {
			if (result[i] == childNode) {
				fitParent(result, parentNode, i)
				foundChild = true
				break
			}
		}
		if (!foundChild) {
			result.push(childNode)
			console.log(result)
			fitParent(result, parentNode, result.length-1)
		}
	}
    return result
}

function fitParent(result, parentNode, index) {
	if (parentNode.length != 0) {
		// check if we have circular dependency
		for (var j=index+1; j<result.length; j++) {
			if (result[j] == parentNode) {
				throw new Error("Found circular dependency: " + parentNode)
			}
		}
		// check if the parent node is already in list
		var foundParent = false
		for (var j=0; j<index; j++) {
			if (result[j] == parentNode) {
				foundParent = true
			}
		}
		if (!foundParent) {
			if (index == 0) {
				result.unshift(parentNode)
			}
			else {
				result.splice(index, 0, parentNode)
			}
		}
		console.log(result)
	}
}
