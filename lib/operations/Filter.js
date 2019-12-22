const Operation = require('../Operation')

class FilterOperation extends Operation {
  constructor(options = {}, step) {
    super(options)

    if (step) this.setStep(step)
  }

  _transform(chunk, encoding, callback) {
    if (this.getStep()(chunk, encoding)) this.push(chunk)
    callback()
  }
}

module.exports = FilterOperation
