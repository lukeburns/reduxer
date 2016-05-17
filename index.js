module.exports = obj
module.exports.ctor = ctor

var through2 = require("through2")

function ctor(options, fn) {
  return through2.ctor(options, function (chunk, encoding, callback) {
    try {
      this.state = fn.call(this, this.state, chunk)
    } catch (e) {
      var err = e
    }
    this.push(this.state)
    return callback(err)
  })
}

function obj(options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  options.objectMode = true
  return ctor(options, fn)()
}
