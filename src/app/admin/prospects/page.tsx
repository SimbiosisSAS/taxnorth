import { redirect } from 'next/navigation'
import ProspectsManager from './ProspectsManager'

export const metadata = {
  title: 'Partner Prospects — TaxNorth Admin',
}

export default async function ProspectsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const params = await searchParams
  if (params.key !== process.env.ADMIN_KEY) redirect('/')

  return <ProspectsManager />
}