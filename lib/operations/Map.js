const Operation = require('../Operation')

class MapOperation extends Operation {
  constructor(options = {}, step) {
    super(options)

    if (step) this.setStep(step)
  }

  _transform(chunk, encoding, callback) {
    this.push(this.getStep()(chunk, encoding))
    callback()
  }
}

module.exports = MapOperation
