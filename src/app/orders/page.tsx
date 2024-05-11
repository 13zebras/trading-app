import {fetchAccounts} from '@/app/actions'
import Orders from '@/components/Orders'


export default async function OrdersPage() {

  return (
    <Orders fetchAccounts={fetchAccounts as () => Promise<string>} />
  )
}
