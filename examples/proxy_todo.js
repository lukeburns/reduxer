var redux = require("../")

var todo = redux.proxy()

todo.add = (state=[], todo, due) => 
  state.concat({ todo, due })
todo.remove = (state=[], index=0) => 
  state.slice(0, index).concat(state.slice(index + 1))

todo
.pipe(redux((state, data) => JSON.stringify(data)+'\n' ))
.pipe(process.stdout)

todo.add('do dishes')
todo.add('pick up the milk', 'tomorrow morning')
todo.remove(0)