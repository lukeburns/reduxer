module.exports = obj
module.exports.ctor = ctor
module.exports.proxy = proxy

var through2 = require("through2")

function ctor (options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  return through2.ctor(options, function (chunk, encoding, callback) {
    try {
      options.state = fn.call(this, options.state, chunk)
    } catch (e) {
      var err = e
    }
    this.push(options.state)
    return callback(err)
  })
}

function obj (options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  options.objectMode = true
  return ctor(options, fn)()
}

function proxy () {
  return proxify(obj(function (state, chunk) {
    chunk = chunk.toString()
    var i = chunk.indexOf(' ')
    var name = chunk.slice(0, i)
    var args = JSON.parse(chunk.slice(i+1))
    args = [state].concat(args)
    return this.fns[name].apply(this, args)
  }))
}

function proxify (target) {
  var handler = {
    set(target, name, fn) {
      target.fns = target.fns || []
      target.fns[name] = fn;
      target[name] = function () {
        target.write(name + ' ' + JSON.stringify(Array.prototype.slice.call(arguments)))
      }
      return true
    }
  }

  return new Proxy(target, handler)
}