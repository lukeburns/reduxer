var redux = require("./")

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