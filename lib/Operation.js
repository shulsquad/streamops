const Transform = require('stream').Transform
const callbackify = require('util').callbackify

const STEP = Symbol('Step')
const OPTIONS = Symbol('Options')

/**
 * @param {*} value
 * @return {*}
 */
function defaultStepOperation(value) {
  return typeof value !== 'function' ? value : () => value
}

class Operation extends Transform {
  /**
   * @param {object} options
   */
  constructor(options = {}) {
    super(options)

    this.setOptions(options)
  }

  /**
   * @return {object}
   */
  getOptions() {
    return Object.assign({}, this[OPTIONS])
  }

  /**
   * @param {object} options
   * @return {Operation}
   */
  setOptions(options = {}) {
    this[OPTIONS] = Object.assign({}, options)
    return this
  }

  /**
   * @return {*|(function(*): *)}
   */
  getStep() {
    if (!this[STEP]) return defaultStepOperation
    if (typeof this[STEP] !== 'function') return defaultStepOperation(this[STEP])
    return !this.isAsync() ? this[STEP] : callbackify(this[STEP])
  }

  /**
   * @param {*|(function(*): *)} step
   * @return {Operation}
   */
  setStep(step) {
    this[STEP] = step
    return this
  }

  /**
   * @return {boolean}
   */
  isAsync() {
    if (typeof this[STEP] !== 'function') return false
    return this[STEP] instanceof Promise || this[STEP].constructor.name === 'AsyncFunction'
  }
}

module.exports = Operation
