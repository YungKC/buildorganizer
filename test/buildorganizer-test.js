var should = require('should'),
    BuildOrganizer = require('../lib/buildorganizer')

var builder

describe('BuildOrganizer', function () {
  describe('#build()', function () {
    before(function () {
      builder = new BuildOrganizer()
    })

    it('should catch bad input', function() {
      should(function() {builder.build(['a: a'])}).throw()
      should(function() {builder.build(['a'])}).throw()
      should(function() {builder.build([5])}).throw()
      should(function() {builder.build(['a: b: c'])}).throw()
    })

    it('should work for 2 independent module build chains', function () {
		var result = builder.build(['a: b','b: c','d: e','e: f'])
		should.exist(result)
		result.should.be.eql(['c','b','a','f','e','d'])
    })

    it('should work for 2 independent module build chains in reverse order', function () {
		var result = builder.build(['e: f','d: e','b: c','a: b'])
		should.exist(result)
		result.should.be.eql(['f','e','d','c','b','a'])
    })
    it('should work for simple 1 module build: [a: ]', function () {
     	var result = builder.build(['a: '])
     	should.exist(result)
		result.should.be.eql(['a'])
    })
    it('should work for simple 2 module build: [a: b]', function () {
     	var result = builder.build(['a: b'])
     	should.exist(result)
		result.should.be.eql(['b','a'])
    })
    it('should work for redundant order: [a: b, a: b]', function () {
     	var result = builder.build(['a: b','a: b','a: b','a: b'])
     	should.exist(result)
		result.should.be.eql(['b','a'])
    })
    it('should work for input with extra spaces: [a:  b]', function () {
     	var result = builder.build(['a:  b'])
     	should.exist(result)
		result.should.be.eql(['b','a'])
    })

    it('should work for simple 3 module build: [a: b,b: c]', function () {
     	var result = builder.build(['a: b','b: c'])
     	should.exist(result)
      	result.should.be.eql(['c','b','a'])
    })
    it('should work for simple 3 module build in reverse order: [b: c, a: b]', function () {
		var result = builder.build(['b: c', 'a: b'])
		should.exist(result)
		result.should.be.eql(['c','b','a'])
    })
    it('should catch circular dependencies: [a: b,b: a]', function () {
		should(function() {var result = builder.build(['a: b','b: a'])}).throw()
    })
    it('should work for multiple dependencies: [a: b,a: c]', function () {
		var result = builder.build(['a: b','a: c'])
		should.exist(result)
		result.should.be.eql(['b','c','a'])
    })
    it('should work for multiple dependencies in reverse direction: [a: b,c: b]', function () {
		var result = builder.build(['a: b','c: b'])
		should.exist(result)
		result.should.be.eql(['b','a','c'])
    })
    it('should work for long module build', function () {
     	var result = builder.build(['a: b','b: c','c: d','d: e','e: f','f: g'])
		should.exist(result)
		result.should.be.eql(['g','f','e','d','c','b','a'])
    })
    it('should work for extremely long module build with random order', function () {
     	var result = builder.build(['c: d','a: b','d: e','a: b','a: c','a: ','e: f','f: g','b: c','a: z','f: y','e: w', 's: t', 'm: n'])
		should.exist(result)
		result.should.be.eql(['g','y','f','w','e','d','c','b','z','a','t','s','n','m'])
    })

    it('should catch long module build with circular dependencies', function () {
     	should(function() {builder.build(['a: b','b: c','c: d','d: e','e: f','f: b'])}).throw()
    })
    it('should catch long module build with multiple dependencies', function () {
     	should(function() {builder.build(['a: b','b: c','c: d','d: e','e:f','b: g'])}).throw()
    })



  })
})