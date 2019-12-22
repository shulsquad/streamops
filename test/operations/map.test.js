const ops = require('../../lib')
const mock = require('../mock')
const { expect } = require('chai')

describe('.map operation test', function mapOperationTest() {
  const start = '1'
  const length = 10

  beforeEach(function() {
    this.readStream = mock.createReadableStream(start, length)
    this.writeStream = mock.createWritableStream()
  })

  it('each value from char to integer test', function eachValueTest() {
    const { readStream, writeStream } = this

    ops(readStream, { objectMode: true })
      .map(chunk => +chunk)
      .pipe(writeStream)
      .on('error', console.error)
      .on('finish', () => {
        expect(writeStream).to.have.property('data')
        expect(writeStream.data.length).to.equal(length)
        for (const v of writeStream.data) expect(v).to.be.a('number')
      })
  })
})
