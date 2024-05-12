import { fetchData } from '@/app/actions'
import Accounts from '@/components/Accounts'


export default async function AccountsPage() {

  return (
    <Accounts fetchData={fetchData as () => Promise<string>} />
  )
}
