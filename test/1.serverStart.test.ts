import assert from 'node:assert'
import http from 'node:http'

import type { Request } from 'express'

import * as app from '../app.js'

export const fakeViewOnlySession = {
  id: '',
  cookie: undefined,
  destroy: undefined,
  regenerate: undefined,
  reload: undefined,
  save: undefined,
  touch: undefined,
  user: {
    userProperties: {
      canCreate: false,
      canUpdate: false,
      isAdmin: false,
      isOperator: false
    }
  }
}

export const fakeAdminSession = {
  id: '',
  cookie: undefined,
  destroy: undefined,
  regenerate: undefined,
  reload: undefined,
  save: undefined,
  touch: undefined,
  user: {
    userProperties: {
      canCreate: true,
      canUpdate: true,
      isAdmin: true,
      isOperator: true
    }
  }
}

export const fakeRequest: Request = {
  accepted: undefined,
  accepts: undefined,
  acceptsCharsets: undefined,
  acceptsEncodings: undefined,
  acceptsLanguages: undefined,
  app: undefined,
  baseUrl: undefined,
  body: undefined,
  cookies: undefined,
  complete: undefined,
  connection: undefined,
  destroy: undefined,
  destroyed: undefined,
  fresh: undefined,
  get: undefined,
  header: undefined,
  headers: undefined,
  host: undefined,
  hostname: undefined,
  httpVersion: undefined,
  httpVersionMajor: undefined,
  httpVersionMinor: undefined,
  ip: undefined,
  ips: undefined,
  is: undefined,
  method: undefined,
  originalUrl: undefined,
  param: undefined,
  params: undefined,
  path: undefined,
  protocol: undefined,
  query: undefined,
  range: undefined,
  rawHeaders: undefined,
  rawTrailers: undefined,
  readable: undefined,
  readableLength: undefined,
  readableHighWaterMark: undefined,
  readableObjectMode: undefined,
  route: undefined,
  secure: undefined,
  setTimeout: undefined,
  signedCookies: undefined,
  socket: undefined,
  stale: undefined,
  subdomains: undefined,
  trailers: undefined,
  url: undefined,
  xhr: undefined
}

export const fakeViewOnlyRequest = Object.assign({}, fakeRequest, {
  session: fakeViewOnlySession
})

export const fakeAdminRequest = Object.assign({}, fakeRequest, {
  session: fakeAdminSession
})

await describe('data-proxier', async () => {
  const httpServer = http.createServer(app)
  const portNumber = 54_333

  let serverStarted = false

  before(() => {
    httpServer.listen(portNumber)

    httpServer.on('listening', () => {
      serverStarted = true
      httpServer.close()
    })
  })

  it('Ensure server starts on port ' + portNumber.toString(), () => {
    assert.ok(serverStarted)
  })
})
