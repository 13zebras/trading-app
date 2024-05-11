'use client'

import { useState } from 'react'

const Accounts = ({ fetchAccounts }: { fetchAccounts: (apiCall: string) => Promise <any> }) => {

  const [accountsFunded, setaccountsFunded] = useState([])

  const handleButtonClick = async () => {
    const data = await fetchAccounts('accounts')
    console.log('>>> data', data)

    const accounts = data.accounts
    console.log('>>> accounts', accounts)
    const accountsWithBalance = accounts?.filter((account: any) => account.available_balance.value !== '0')
    console.log('>>> accountsWithBalance', accountsWithBalance)
    setaccountsFunded(accountsWithBalance) 
  }

  const buildTable = () => {
    return (
      <table className="text-zinc-300 border-zinc-600">
        <tr className='text-left border-zinc-600'>
          <th className='w-32 p-1 px-2 border-2 border-zinc-600'>Currency</th>
          <th className='w-64 p-1 px-2 border-2 border-zinc-600'>Balance</th>
        </tr>
        {
          accountsFunded.map((account: any) => {
            return (
              <tr key={account.uuid}>
                <td className='p-1 px-2 border-2 border-zinc-600'>{account.available_balance.currency}</td>
                <td className='p-1 px-2 border-2 border-zinc-600'>{account.available_balance.value} </td>
              </tr>
            )
          })
        }
      </table>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-y-16 p-24">
      <h1 className="text-3xl font-bold text-center text-zinc-400">Accounts Data</h1>
      <button onClick={handleButtonClick} className="bg-violet-800 hover:bg-violet-700 active:bg-violet-600 text-zinc-300 text-lg font-bold py-1 w-48 rounded-2xl">Get Accounts</button>
        
        {accountsFunded?.length === 0 ?
        (<div className="text-zinc-300"> Nothing to see here...</div>)
        : buildTable()}
        
      
    </main>
  )
}

export default Accounts