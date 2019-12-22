const ops = require('../lib')
const mock = require('./mock')
const { expect } = require('chai')
const { finished } = require('stream')
const { promisify } = require('util')

const finish = promisify(finished)

describe('stream operations test', function streamOpsTest() {
  const start = 1
  const length = 10
  const dataArray = Array.from({ length }, (_, i) => 2 ** i)

  it('.clone static method test', async function staticCloneTest() {
    const readStream = mock.createReadableStream(start, length)
    const clonedStream = ops.clone(readStream, { objectMode: true })
    const readStreamData = []
    readStream.on('data', chunk => readStreamData.push(chunk))
    const clonedStreamData = []
    clonedStream.on('data', chunk => clonedStreamData.push(chunk))

    await Promise.all([finish(readStream), finish(clonedStream)])

    expect(readStreamData.length).to.equal(length)
    expect(clonedStreamData.length).to.equal(length)

    for (let i = 0; i < length; i++) expect(readStreamData[i]).to.equal(clonedStreamData[i])
  })

  it('.from static method test', async function staticCloneTest() {
    const readStream = ops.from(dataArray)

    const readStreamData = []
    readStream.on('data', chunk => readStreamData.push(chunk))

    await finish(readStream)

    expect(readStreamData.length).to.equal(length)
    for (let i = 0; i < length; i++) expect(readStreamData[i]).to.equal(dataArray[i])
  })

  require('./operations/index.test')
})
