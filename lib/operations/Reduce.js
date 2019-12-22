const Operation = require('../Operation')

class ReduceOperation extends Operation {
  constructor(options = {}, step, initialValue) {
    super(options)

    if (step) this.setStep(step)

    this.accumulator = initialValue
  }

  _transform(chunk, encoding, callback) {
    this.accumulator = this.getStep()(this.accumulator, chunk, encoding)
    callback()
  }

  _final(callback) {
    this.push(this.accumulator)
    callback()
  }
}

module.exports = ReduceOperation
