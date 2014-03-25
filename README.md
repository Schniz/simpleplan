simpleplan.js
=============

Simple dependency injector for your precious node apps.

Installation
------------
`npm install simpleplan --save`

Usage:
------
```js
// my-module.js
require('simpleplan')();

var iNeedMongooseHere = function(Mongoose) {
  // Do some dirty things with Mongoose
}.inject();
```

```js
require('simpleplan')();
var dependencies = {
  Mongoose: 'store here any object you would like',
  app:      'hell yeah'
};

var myModule = require('myModule')(dependencies); // Mongoose will magically be injected into the function. wow. I know.
```

Contributing
------------
Fork this repo.
Install dependencies. (`npm install`)
Make sure it runs all the tests. (`mocha`)
Branch.
Code.
Pull Request.
$$$.