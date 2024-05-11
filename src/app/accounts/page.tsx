import {fetchAccounts} from '@/app/actions'
import Accounts from '@/components/Accounts'


export default async function AccountsPage() {

  return (
    <Accounts fetchAccounts={fetchAccounts as () => Promise<string>} />
  )
}
