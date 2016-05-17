var redux = require('../')

var counter = redux.proxy()

counter.increment = function (state=0, chunk) {
  return state+1
}

counter.decrement = function (state=0, chunk) {
  return state-1
}

counter.pipe(redux((state, data) => data.toString()+'\n' )).pipe(process.stdout)

counter.increment()
// 1
counter.increment()
// 2
counter.decrement()
// 1