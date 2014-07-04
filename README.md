![simpleplan.js](http://cl.ly/image/0n2w001f3p0X/logo.png)

Simple dependency injector for your precious node apps.
![Build status](https://travis-ci.org/Schniz/simpleplan.svg)

Installation
------------
`npm install simpleplan --save`

Usage:
------
you write yourself a delicious module

```js
// my-module.js
require('simpleplan')();

var iNeedMongooseHere = function(Mongoose) {
  // Do some dirty things with Mongoose
}.inject();
```

And then on the main app you go like

```js
// index.js
var simpleplan = require('simpleplan')();
simpleplan.register("Mongoose", "store here any object you would like.");
simpleplan.register("app",      "and it will magically injected to your favorite methods");

var myModule = require('myModule')(); // Mongoose will magically be injected into the function. wow. I know.
```

That's it.

WAT
---
By calling the base require of simpleplan, it extends javascript's `Function` and provides 2 more methods: `inject()` and `use(params)`.

### `register(key, value)`
simply stores your dependencies in a key-value hash for the default dependencies.
It was made for not passing a dependencies hash for every function you want to inject to.

```js
simpleplan.register("a", { thisIs: "Its value" }); // It will be injected to any 'a' parameter
                                                   // unless it is being overriden in the function call.
```

### `use(params)`
Tells simpleplan you want to inject some dependencies to this function, with the right order.

Parameter names are not strict.
```js
var somefunc = function(a,b,c) {
  console.log("a: " + a + ", b: " + b + ", c: " + c);
}.use("c", "b", "whoIsAwesome");

somefunc({ c: "First", b: "Second", whoIsAwesome: "Gal Schlezinger" }); // "a: First, b: Second, c: Gal Schlezinger"

```

### `inject()`
Same as `use(params)` only here you don't need to give in an array of dependency names - it takes them from the method signature.

```js
var somefunc = function(a,b,c) {
  console.log("a: " + a + ", b: " + b + ", c: " + c);
}.inject();

somefunc({ b: "First", c: "Second", a: "Gal Schlezinger" }); // "a: Gal Schlezinger, b: First, c: Second"
```

## Don't touch my `Function`'s prototype!
Well, you can also go like
```js
var simpleplan = require('simpleplan');
var inject   = simpleplan.inject,
    register = simpleplan.register;

register("param", "Hugh Jackman!");

var func = inject(function(param) {
  return "Who's the man? " + param;
});

func("Gal!"); // => "Who's the man? Gal!"
func(); // "Who's the man? Hugh Jackman!"
```
but as you can see, its not as awesome as extending `Function`.

CoffeeScript Usage
------------------
```coffeescript
{ register, inject } = require 'simpleplan'

register "first", "Hello"
register "second", "World"

myFunc = inject (first, second) ->
  "#{first} #{second}!"

myFunc() # => "Hello World!"
myFunc first: "wat" #=> "wat World!"
```

Changelog
---------
### `0.1.0`
- Added registry for stop passing the dependencies object to every method.

### `0.0.2`
- Added CoffeeScript support (`inject ->`..)

Contributing
------------
- Fork this repo.
- Install dependencies. (`npm install`)
- Make sure it runs all the tests. (`mocha`)
- Branch.
- Code.
- Pull Request.
- $$$.
