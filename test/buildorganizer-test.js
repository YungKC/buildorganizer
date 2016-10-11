var should = require('should'),
    BuildOrganizer = require('../lib/buildorganizer')

var builder

describe('BuildOrganizer', function () {
  describe('#build()', function () {
    before(function () {
      builder = new BuildOrganizer()
    })
    it('should work for simple 1 module build: [a:]', function () {
     	var result = builder.build(['a:'])
     	should.exist(result)
      	result.should.be.eql(['a'])
    })
    it('should work for simple 2 module build: [a:b,b:c]', function () {
     	var result = builder.build(['a:b','b:c'])
     	should.exist(result)
      	result.should.be.eql(['c','b','a'])
    })
    it('should catch circular dependencies: [a:b,b:a]', function () {
     	var result = builder.build(['a:b','b:a'])
     	should.not.exist(result)
    })
    it('should catch multiple dependencies: [a:b,a:c]', function () {
     	var result = builder.build(['a:b','a:c'])
     	should.not.exist(result)
    })
    it('should work for long module build', function () {
     	var result = builder.build(['a:b','b:c','c:d','d:e','e:f','f:g'])
      	should.exist(result)
      	result.should.be.eql(['g','f','e','d','c','b','a'])
    })
    it('should catch long module build with circular dependencies', function () {
     	var result = builder.build(['a:b','b:c','c:d','d:e','e:f','f:b'])
      	should.not.exist(result)
    })
    it('should catch long module build with multiple dependencies', function () {
     	var result = builder.build(['a:b','b:c','c:d','d:e','e:f','b:g'])
      	should.not.exist(result)
    })
  })
})