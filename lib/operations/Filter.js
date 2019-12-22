const Operation = require('../Operation')

class FilterOperation extends Operation {
  constructor(options = {}, step) {
    super(options)

    if (step) super.setStep(step)
  }

  _transform(chunk, encoding, callback) {
    this.getStep()(chunk, encoding, (error, ok) => {
      if (error) return callback(error)
      return ok ? callback(null, chunk) : callback()
    })
  }
}

module.exports = FilterOperation
