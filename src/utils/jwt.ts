import { sign } from 'jsonwebtoken'
import crypto from 'crypto'
import { JwtPayload, SignOptions } from 'jsonwebtoken'

const getJwtToken = (apiCall: string) => {

  let url = 'api.coinbase.com'

  if (apiCall === 'accounts') {
    url += '/api/v3/brokerage/accounts'
  } else if (apiCall === 'fills') {
    url += '/api/v3/brokerage/orders/historical/fills'
  } else if (apiCall === 'batch') {
    url += '/api/v3/brokerage/orders/historical/batch'
  } else {
    return 'Invalid url for JWT'
  }

  console.log('\n\n>>> JWT URL:\n', url)

  const keyName = process.env.API_KEY_NAME
  const privateKey = process.env.API_PRIVATE_KEY
  const requestMethod = 'GET'
  
  const uri = `${requestMethod} ${url}`

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

export default getJwtToken