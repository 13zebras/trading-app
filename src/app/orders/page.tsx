import { fetchData } from '@/app/actions'
import Orders from '@/components/Orders'


export default async function OrdersPage() {

  return (
    <Orders fetchData={fetchData as () => Promise<string>} />
  )
}
