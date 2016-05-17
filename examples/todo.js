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

todo.write('add do dishes')
todo.write('add pick up the milk')
todo.write('remove 0')