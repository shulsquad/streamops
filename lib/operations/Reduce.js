const Operation = require('../Operation')

class ReduceOperation extends Operation {
  constructor(options = {}, step, initialValue) {
    super(options)

    if (step) super.setStep(step)

    this.accumulator = initialValue || 0
  }

  _transform(chunk, encoding, callback) {
    this.getStep()(chunk, encoding, (error, value) => {
      if (error) return callback(error)
      this.accumulator += value
      callback(null, value)
    })
  }

  _final(callback) {
    callback(null, this.accumulator)
  }
}

module.exports = ReduceOperation
