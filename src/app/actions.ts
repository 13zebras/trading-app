'use server'

import getJwtToken from '@/utils/jwt'

export const fetchData = async (apiCall: string) => {

  let endpoint = 'api.coinbase.com/api/v3/brokerage'
  let queryParams = ''

  switch (apiCall) {
    case 'accounts':
      endpoint += '/accounts'
      queryParams = '?limit=250'
      break
    case 'fills':
      endpoint += '/orders/historical/fills'
      queryParams = '?product_id=BTC-USD'
      break
    case 'batch':
      endpoint += '/orders/historical/batch'
      break
    case 'listProducts':
      endpoint += '/products'
      break
    default:
      return 'Invalid API call.'
  }

  console.log('\n\n>>> api endpoint:', endpoint)

  const JWT = getJwtToken(endpoint)
  console.log('\n>>> JWT:\n', JWT)

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT}` // Replace JWT with your token
    },
    redirect: "follow"
  }

  const url = `https://${endpoint}${queryParams}`

  
  try {
    const response = await fetch(url, requestOptions)
    console.log('>>> api call response:\n', response)
    const responseJson = await response.json()
    // console.log('>>> api call result:\n', result)
    // console.log('>>> type of result:\n', typeof result)
    return responseJson
  } catch (error) {
    console.log('\n\n******************************************************\n\n')
    console.error('>>> api call ERROR', error, '\n\n******************************************************\n\n')
  }
}