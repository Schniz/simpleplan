expect = require('chai').expect

describe "CoffeeScript integration", ->
  simpleplan = null

  before ->
    simpleplan = require('../lib/simpleplan')

  it "should be able to use only the #inject function", ->
    expect(simpleplan.inject).to.be.a('function')

  describe "after calling", ->
    myfunc = null
    myfuncWithoutArguments = null
    { use, inject } = require('../lib/simpleplan')

    before ->
      myfunc = (firstMessage, secondMessage) -> "#{firstMessage}, #{secondMessage}"
      myfuncWithoutArguments = -> "this is a function."

    describe "#use", ->
      it "should inject the parameters by their order", ->
        used = use myfunc, "hey", "ho"
        alefbet = used
          hey: 'alef'
          ho: 'bet'
        expect(alefbet).to.equal "alef, bet"

        used = use myfunc, "secondMessage", "firstMessage"
        betalef = used
          firstMessage: 'alef'
          secondMessage: 'bet'
        expect(betalef).to.equal "bet, alef"

      it "should work with a function without arguments", ->
        used = use myfuncWithoutArguments, "someArgument"
        value = used someArgument: 'arggggg'
        expect(value).to.equal('this is a function.')

    describe "#inject", ->
      it "should work with normal arguments", ->
        injected = inject myfunc
        alefbet = injected
          firstMessage: 'alef'
          secondMessage: 'bet'
        expect(alefbet).to.equal("alef, bet")

      it "should raise an error if a parameter is left with no injection", ->
        expect(->
          injected = inject myfunc

          injected firstMessage: 'alef'
        ).to.throw Error

      it "should work with external modules", ->
        value = require('./modules/dependent-module')
          text: "hello world"
        expect(value).to.equal "text: hello world"

      it "should work with a function without arguments", ->
        value = myfuncWithoutArguments.inject()({ someArgument: 'arggggg' })
        expect(value).to.equal('this is a function.')
