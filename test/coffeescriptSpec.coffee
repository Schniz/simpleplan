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
    { use, inject, register } = require('../lib/simpleplan')

    before ->
      myfunc = (coffeeFirstMessage, coffeeSecondMessage) -> "#{coffeeFirstMessage}, #{coffeeSecondMessage}"
      myfuncWithoutArguments = -> "this is a function."

    describe "#use", ->
      it "should inject the parameters by their order", ->
        used = use myfunc, "hey", "ho"
        alefbet = used
          hey: 'alef'
          ho: 'bet'
        expect(alefbet).to.equal "alef, bet"

        used = use myfunc, "coffeeSecondMessage", "coffeeFirstMessage"
        betalef = used
          coffeeFirstMessage: 'alef'
          coffeeSecondMessage: 'bet'
        expect(betalef).to.equal "bet, alef"

      it "should work with a function without arguments", ->
        used = use myfuncWithoutArguments, "someArgument"
        value = used someArgument: 'arggggg'
        expect(value).to.equal('this is a function.')

    describe "#inject", ->
      it "should work with normal arguments", ->
        injected = inject myfunc
        alefbet = injected
          coffeeFirstMessage: 'alef'
          coffeeSecondMessage: 'bet'
        expect(alefbet).to.equal("alef, bet")

      it "should raise an error if a parameter is left with no injection", ->
        expect(->
          injected = inject myfunc

          injected coffeeFirstMessage: 'alef'
        ).to.throw Error

      it "should work with external modules", ->
        value = require('./modules/dependent-module')
          text: "hello world"
        expect(value).to.equal "text: hello world"

      it "should work with a function without arguments", ->
        value = myfuncWithoutArguments.inject()({ someArgument: 'arggggg' })
        expect(value).to.equal('this is a function.')

      describe "register use", ->
        injectedFunc = null

        before ->
          register "coffeeFirstMessage", "howdy"
          register "coffeeSecondMessage", "world!"

          injectedFunc = inject myfunc

        it "should complete the missing dependencies from the registry", ->
          expect(injectedFunc()).to.equal "howdy, world!"
          expect(injectedFunc(coffeeFirstMessage: "wat")).to.equal "wat, world!"
          expect(injectedFunc(coffeeSecondMessage: "wat")).to.equal "howdy, wat"
          expect(injectedFunc(coffeeSecondMessage: "b", coffeeFirstMessage: "a")).to.equal "a, b"
