module.exports = reduxer
module.exports.ctor = ctor
module.exports.obj = obj

var through2 = require("through2")

function reduxer (options, fn) {
  return ctor(options, fn)()
}

function obj (options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  return ctor({ objectMode: true }, fn)(options)
}

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