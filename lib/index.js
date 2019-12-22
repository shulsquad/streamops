const { PassThrough, Readable } = require('stream')
const operations = require('./operations')

const streamOperations = function streamOperations(stream, options = {}) {
  let clone = stream.pipe(new PassThrough({ objectMode: true }))
  return {
    map: function streamMapOperation(step) {
      clone = clone.pipe(new operations.Map(options, step))
      return clone
    },
    filter: function streamFilterOperation(step) {
      clone = clone.pipe(new operations.Filter(options, step))
      return clone
    },
    reduce: function streamReduceOperation(step, initialValue) {
      clone = clone.pipe(new operations.Reduce(options, step, initialValue))
      return clone
    }
  }
}

streamOperations.clone = function makeStreamClone(stream, options = {}) {
  return stream.pipe(new PassThrough(options))
}

streamOperations.from = function makeStreamFrom(data) {
  const isObjectMode = value => !(value && (Buffer.isBuffer(value) || typeof value === 'string'))
  return Readable.from(Array.isArray(data) ? Array.from(data) : [data], {
    objectMode: Array.isArray(data) ? data.every(isObjectMode) : isObjectMode(data)
  })
}

module.exports = streamOperations
