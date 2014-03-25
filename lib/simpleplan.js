module.exports = function() {
  // Awesome snippet by Jack Allan @ http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var getParamNames = function(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);

    return result;
  };

  /**
    extracts the arguments from the form of { '0': arg0, '1': arg1, .. } to [arg0, arg1]
  **/
  var extractArguments = function(arguments) {
    var length = arguments.length;
    var args = [];

    for (var i = 0; i < length; i++) {
      args.push(arguments[i]);
    };

    return args;
  };

  Function.prototype.inject = function() {
    var paramNames = getParamNames(this);
    return this.use.apply(this, paramNames);
  };

  /**
    arguments: injections
  **/
  Function.prototype.use = function() {
    var deps = extractArguments(arguments);
    var func = this;

    return function(dependencies) {
      dependencies = dependencies || {};

      var injectedDependencies = deps.map(function(dep) {
        if (!(dep in dependencies)) {
          throw Error("Dependency " + dep + " wasn't injected. available dependencies: " + Object.keys(dependencies).join(", "));
        }
        return dependencies[dep];
      });

      return func.apply(this, injectedDependencies);
    }
  }
};