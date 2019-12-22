const operations = require('./operations')

module.exports = function streamOperations(stream, options = {}) {
  return {
    map: function streamMapOperation(step) {
      return stream.pipe(new operations.Map(options, step))
    },
    filter: function streamFilterOperation(step) {
      return stream.pipe(new operations.Filter(options, step))
    },
    reduce: function streamReduceOperation(step, initialValue) {
      return stream.pipe(new operations.Reduce(options, step, initialValue))
    }
  }
}
