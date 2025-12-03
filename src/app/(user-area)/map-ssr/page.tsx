import Header from '@/components/ui/header/hearder'
import HeaderClient from '@/components/map/HeaderClient'
import MapClient from '@/components/map/MapClient'
import { makeRemoteGetAllProperties } from '@/main/factories/usecases/remote-get-all-properties-factory'
import { PropertyModel } from '@/domain/models/property-model'

export const revalidate = 0

async function fetchProperties(): Promise<PropertyModel[]> {
  try {
    const getAll = makeRemoteGetAllProperties()
    const data = await getAll.getAll()
    return data ?? []
  } catch (err) {
    console.error('Error fetching properties on server:', err)
    return []
  }
}

export default async function MapSSRPage() {
  const properties = await fetchProperties()

  const locations = (properties ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    coordinates: { latitude: p.latitude, longitude: p.longitude },
  }))

  return (
    <main className="p-4">
      <Header title="Mapa (SSR) de Pulverizações">
        <HeaderClient locations={locations} />
      </Header>

      <div className="mt-4">
        <MapClient properties={properties} />
      </div>
    </main>
  )
}
