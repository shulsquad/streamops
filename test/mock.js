const { Readable, Writable } = require('stream')

function* generate(prefix, size) {
  for (let i = 0; i < size; i++) {
    yield prefix + i
  }
}

function createReadableStream(valueForEachChunk, chunksNumber) {
  return Readable.from(generate(valueForEachChunk, chunksNumber), { objectMode: true })
}

class WritableStream extends Writable {
  constructor(options = {}) {
    super(options)

    this.data = []
  }

  _write(chunk, encoding, callback) {
    this.data.push(chunk)
    callback()
  }

  _final(callback) {
    callback()
  }
}

function createWritableStream(options = { objectMode: true }) {
  return new WritableStream(options)
}

module.exports = { createReadableStream, createWritableStream }
