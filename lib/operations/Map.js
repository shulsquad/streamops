const Operation = require('../Operation')

class MapOperation extends Operation {
  constructor(options = {}, step) {
    super(options)

    if (step) super.setStep(step)
  }

  _transform(chunk, encoding, callback) {
    this.getStep()(chunk, encoding, callback)
  }
}

module.exports = MapOperation
