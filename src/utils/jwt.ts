import { sign } from 'jsonwebtoken'
import crypto from 'crypto'
import { JwtPayload, SignOptions } from 'jsonwebtoken'

export default function getJwtToken() {
  const keyName = process.env.API_KEY_NAME
  const privateKey = process.env.API_PRIVATE_KEY
  const requestMethod = 'GET'
  const baseUrl = 'api.coinbase.com'
  const requestPath = '/api/v3/brokerage/accounts'
  const uri = `${requestMethod} ${baseUrl}${requestPath}`

  const payload: JwtPayload = {
    sub: keyName,
    iss: 'coinbase-cloud',
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 120,
    uri: uri,
  }

  const signOptions: SignOptions = {
    algorithm: 'ES256',
    header: {
      kid: keyName,
      nonce: crypto.randomBytes(16).toString('hex'),
    },
  }

  return sign(payload, privateKey, signOptions)
}