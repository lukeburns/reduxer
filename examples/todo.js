var redux = require("../")

var todo = redux((state=[], chunk) => {
  var i = chunk.indexOf(' ')
  switch (chunk.slice(0, i)) {
  case 'add':
    return [...state, chunk.slice(i+1)]
  case 'remove':
    return [...state.slice(0, chunk.slice(i)), ...state.slice(chunk.slice(i)+1)]
  default:
    return state
  }
})

todo.on('data', (data) => 
  console.log(data)
)

todo.write('add todo 0')
// ['todo 0']
todo.write('add todo 1')
// ['todo 0', 'todo 1']
todo.write('remove 0')
// ['todo 1']