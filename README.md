reduxer
===============

[![NPM](https://nodei.co/npm/reduxer.png)](https://nodei.co/npm/reduxer/)

`reduxer` is a stream that works like `redux`.

example
-------

```js

var redux = require('redux')

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

Create a Redux *instance*. Options default to `{ objectMode: true }`

`redux.ctor([options,] fn)`

Create a Redux *class*

options
-------

  * all through2 options

attribution
-------

Thanks to @brycebaril. Borrowed from `through2-reduce`.
