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


/**
  arguments: injections
**/
var use = function() {
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

var inject = function() {
  var paramNames = getParamNames(this);
  return use.apply(this, paramNames);
};

var simpleplan = function() {
  Function.prototype.use = use;
  Function.prototype.inject = inject;
}

simpleplan.inject = function(method) {
  return inject.apply(method);
};
simpleplan.use = function(method) {
  return use.apply(method, [].slice.call(arguments, 1));
};
simpleplan.getParamNames = getParamNames;

module.exports = simpleplan;
