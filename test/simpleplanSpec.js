var expect = require('chai').expect;
//var blanket = require('blanket')();

describe("simpleplan", function() {
  var simpleplan;

  before(function() {
    // Call it!
    simpleplan = require('../lib/simpleplan');
  });

  it("should be a function", function() {
    expect(simpleplan).to.be.a("function");
  });

  it("should not throw an error when calling it", function() {
    expect(simpleplan).to.not.throw(Error);
  });

  describe("after calling", function() {
    var myfunc;
    var myfuncWithoutArguments;

    before(function() {
      simpleplan();

      myfunc = function(firstMessage, secondMessage) {
        return firstMessage + ", " + secondMessage;
      };

      myfuncWithoutArguments = function() {
        return "this is a function.";
      };
    });

    describe("extending `function`", function() {
      it("method `use`", function() {
        expect(myfunc.use).to.be.a("function");
      });

      it("method `inject`", function() {
        expect(myfunc.inject).to.be.a("function");
      });
    });

    describe("#use", function() {
      it("should inject the parameters by their order", function() {
        var alefbet = myfunc.use("firstMessage", "secondMessage")({ firstMessage: 'alef', secondMessage: 'bet' });
        expect(alefbet).to.equal("alef, bet");

        var betalef = myfunc.use("secondMessage", "firstMessage")({ firstMessage: 'alef', secondMessage: 'bet' });
        expect(betalef).to.equal("bet, alef");
      });

      it("should work with a function without arguments", function() {
        var value = myfuncWithoutArguments.use("someArgument")({ someArgument: 'arggggg' });
        expect(value).to.equal('this is a function.');
      });
    });

    describe("#inject", function() {
      it("should work with normal arguments", function() {
        var alefbet = myfunc.inject()({ firstMessage: 'alef', secondMessage: 'bet' });
        expect(alefbet).to.equal("alef, bet");
      });

      it("should raise an error if a parameter is left with no injection", function() {
        expect(function injectionWithoutSecondMessage() {
          myfunc.inject()({ firstMessage: 'alef'});
        }).to.throw(Error);
      });

      it("should work with external modules", function() {
        var value = require('./modules/dependent-module')({ text: "hello world" });
        expect(value).to.equal("text: hello world");
      });

      it("should work with a function without arguments", function() {
        var value = myfuncWithoutArguments.inject()({ someArgument: 'arggggg' });
        expect(value).to.equal('this is a function.');
      });
    });
  });
});