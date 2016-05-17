var test = require('tape').test

var redux = require('../')
var spigot = require('stream-spigot')
var concat = require('terminus').concat
var isnumber = require('isnumber')

test('object chunks', function (t) {
  t.plan(1)

  var meaner = redux(function (prev={time: 0, mean: 0}, curr) {
    var mean = prev.mean - (prev.mean - curr.mean) / (prev.time + 1)
    prev.mean = mean
    prev.time = curr.time
    return prev
  })

  var chunks = [
    {time: 1, mean: 2},
    {time: 2, mean: 4},
    {time: 3, mean: 8},
    {time: 4, mean: 2},
    {time: 5, mean: 6},
    {time: 6, mean: 8},
    {time: 7, mean: 10},
    {time: 8, mean: 2},
  ];

  meaner.on('data', function (data) {
    if (data.time == 8) {
      t.deepEquals(data, {time: 8, mean: 5.25})
    }
  })

  spigot({objectMode: true}, chunks).pipe(meaner)

})

test('catch error', function (t) {
  t.plan(2)

  var Sum = redux.ctor(function (prev, curr) {
    if (!isnumber(curr)) {
      this.emit('error', new Error('Values must be numeric'))
    }
    return prev + parseFloat(curr)
  })

  function combine(result) {
    t.notOk(1, 'Should not complete pipeline when error')
  }

  var summer = new Sum({objectMode: true})
  summer.on('error', function (err) {
    t.ok(err, 'should be an error')
    t.equals(err.message, 'Values must be numeric')
  })

  spigot({objectMode: true}, [2, 4, 8, 2, 'cat', 8, 10])
    .pipe(summer)
    .pipe(concat({objectMode: true},combine))
})

test('catch throw', function (t) {
  t.plan(2)

  var Sum = redux.ctor(function (prev, curr) {
    if (!isnumber(curr)) {
      throw new Error('Values must be numeric')
    }
    return prev + parseFloat(curr)
  })

  function combine(result) {
    t.notOk(1, 'Should not complete pipeline when error')
  }

  var summer = new Sum({objectMode: true})
  summer.on('error', function (err) {
    t.ok(err, 'should be an error')
    t.equals(err.message, 'Values must be numeric')
  })

  spigot({objectMode: true}, [2, 4, 8, 2, 'cat', 8, 10])
    .pipe(summer)
    .pipe(concat({objectMode: true},combine))
})

