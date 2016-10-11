var should = require('should'),
    BuildOrganizer = require('../lib/buildorganizer')

var builder

describe('BuildOrganizer', function () {
  describe('#build()', function () {
    before(function () {
      builder = new BuildOrganizer()
    })
    it('should work for simple 1 module build', function () {
     	var result = builder.build(['a:'])
     	should.exist(result)
      	result.should.be.eql(['a'])
    })
    it('should work for simple 2 module build', function () {
     	var result = builder.build(['a:b','b:c'])
     	should.exist(result)
      	result.should.be.eql(['c','b','a'])
    })
  })
})