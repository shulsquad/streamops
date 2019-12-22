const ops = require('../../lib')
const mock = require('../mock')
const { expect } = require('chai')

describe('.reduce operation test', function reduceOperationTest() {
  const start = 1
  const length = 10

  beforeEach(function() {
    this.readStream = mock.createReadableStream(start, length)
    this.writeStream = mock.createWritableStream()
  })

  it('summary of all chars to integer test', function eachValueTest() {
    const { readStream, writeStream } = this

    ops(readStream, { objectMode: true })
      .reduce((a, c) => a + c, 0)
      .pipe(writeStream)
      .on('error', console.error)
      .on('finish', () => {
        expect(writeStream).to.have.property('data')
        expect(writeStream.data.length).to.equal(1)
        expect(writeStream.data[0]).to.equal(
          Array.from({ length }, (_, i) => start + i).reduce((a, c) => a + c, 0)
        )
      })
  })
})
