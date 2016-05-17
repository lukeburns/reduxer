var redux = require("../")

var todo = redux.proxy()

todo.add = function (state=[], todo, due) {
  return [...state, { todo, due }]
}

todo.remove = function (state=[], index=0) {
  return [...state.slice(0, index), ...state.slice(index + 1)]
}

todo.pipe(redux((state, data) => JSON.stringify(data)+'\n' )).pipe(process.stdout)

todo.add('do dishes')
todo.add('pick up the milk', 'tomorrow morning')
todo.remove(0)