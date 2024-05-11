import { getJwtToken } from "@utils/jwt";

const fetchAccounts = async () => {
  
  const JWT = getJwtToken()

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${JWT}` // Replace JWT with your token
    },
    redirect: "follow"
  }

  try {
    const response = await fetch("https://api.exchange.coinbase.com/accounts", requestOptions);
    const result = await response.text()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}


export default async function AccountsPage() {

  const accountsData = await fetchAccounts()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center lg:text-left text-zinc-400">Accounts Data</h1>
        <p className="text-zinc-300">
          {accountsData || 'Loading...'}
        </p>
      </div>
    </main>
  );
}
