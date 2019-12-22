const ops = require('../../lib')
const mock = require('../mock')
const { expect } = require('chai')

describe('.filter operation test', function filterOperationTest() {
  const start = 1
  const length = 10

  beforeEach(function() {
    this.readStream = mock.createReadableStream(start, length)
    this.writeStream = mock.createWritableStream()
  })

  it('each odd value from char to integer test', function eachValueTest() {
    const { readStream, writeStream } = this

    ops(readStream, { objectMode: true })
      .filter(chunk => chunk % 2 !== 0)
      .pipe(writeStream)
      .on('error', console.error)
      .on('finish', () => {
        expect(writeStream).to.have.property('data')
        expect(writeStream.data.length).to.equal(length / 2)
        for (const v of writeStream.data) expect(v % 2).to.equal(1)
      })
  })
})
