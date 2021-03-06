reduxer
===============

[![NPM](https://nodei.co/npm/reduxer.png)](https://nodei.co/npm/reduxer/)

reduxer is a stream api that works like [redux](http://redux.js.org/).

example
-------

```js
var redux = require('reduxer')

var counter = redux((state=0, chunk) => {
  switch (chunk) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
})

counter.on('data', (data) => 
  console.log(data)
)

counter.write('INCREMENT')
// 1
counter.write('INCREMENT')
// 2
counter.write('DECREMENT')
// 1
```

install
-----

```
npm install reduxer
```

api
----

`redux([options,] fn)`

Create a Redux *instance*.

`redux.obj([options,] fn)`

Create a Redux *instance* with `{ objectMode: true }`.

`redux.ctor([options,] fn)`

Create a Redux *class*.

options
-------

  * all through2 options and an optional initial `state` object

attribution
-------

Thanks to [brycebaril](https://github.com/brycebaril). Borrowed from [through2-reduce](https://github.com/brycebaril/through2-reduce).
