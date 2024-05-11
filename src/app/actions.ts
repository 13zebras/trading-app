'use server'

import getJwtToken from '@/utils/jwt'

export const fetchAccounts = async (apiCall: string) => {

  const JWT = getJwtToken(apiCall)

  console.log('\n\n>>> JWT:\n', JWT)

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT}` // Replace JWT with your token
    },
    redirect: "follow"
  }

  let url = 'https://api.coinbase.com/api/v3/brokerage'

  if (apiCall === 'accounts') {
    url += '/accounts?limit=250'
  } else if (apiCall === 'fills') {
    url += '/orders/historical/fills'
  } else if (apiCall === 'batch') {
    url += '/orders/historical/batch'
  } else {
    return 'Invalid API call.'
  }

  console.log('\n>>> url api:', url)

  try {
    const response = await fetch(url, requestOptions)
    console.log('>>> api call response:\n', response)
    const result = await response.json()
    // console.log('>>> api call result:\n', result)
    // console.log('>>> type of result:\n', typeof result)
    return result
  } catch (error) {
    console.log('\n\n******************************************************\n\n')
    console.error('>>> api call ERROR', error, '\n\n******************************************************\n\n')
  }
}