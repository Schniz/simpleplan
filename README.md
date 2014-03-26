simpleplan.js
=============

Simple dependency injector for your precious node apps.

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
require('simpleplan')();
var dependencies = {
  Mongoose: 'store here any object you would like',
  app:      'hell yeah'
};

var myModule = require('myModule')(dependencies); // Mongoose will magically be injected into the function. wow. I know.
```

That's it.

WAT
---
simpleplan extends javascript's `Function` and provides 2 more methods: `inject()` and `use(params)`.

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

Contributing
------------
- Fork this repo.
- Install dependencies. (`npm install`)
- Make sure it runs all the tests. (`mocha`)
- Branch.
- Code.
- Pull Request.
- $$$.
