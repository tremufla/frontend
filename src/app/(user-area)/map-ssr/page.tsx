import Header from '@/components/ui/header/hearder'
import HeaderClient, { Location } from '@/components/map/HeaderClient'
import MapClient from '@/components/map/MapClient'
import { makeRemoteGetAllProperties } from '@/main/factories/usecases/remote-get-all-properties-factory'
import { PropertyModel } from '@/domain/models/property-model'
import { makeRemoteGetApplicationScheduleMapByRisk } from '@/main/factories/usecases/remote-get-application-schedule-map-by-risk-factory'
import { ApplicationScheduleByRiskModel } from '@/domain/models/application-schedule-by-risk-model'

export const revalidate = 0

async function fetchProperties(): Promise<PropertyModel[]> {
  try {
    const useCase = makeRemoteGetAllProperties()

    const data = await useCase.getAll()

    return data ?? []
  } catch (err) {
    console.error('Error fetching properties on server:', err)
    return []
  }
}

async function fetchScheduleData(locations: Location[]): Promise<ApplicationScheduleByRiskModel> {
  try {
    if (locations.length === 0) return { danger: [], warning: [], safe: [] }

    const firstLocation = locations[0].coordinates

    const useCase = makeRemoteGetApplicationScheduleMapByRisk()

    const data = await useCase.mapView(firstLocation)

    return data ?? { danger: [], warning: [], safe: [] }
  } catch (err) {
    console.error('Error fetching properties on server:', err)
    return { danger: [], warning: [], safe: [] }
  }
}

export default async function MapSSRPage() {
  const properties = await fetchProperties()

  const locations = (properties ?? []).map((property) => ({
    id: property.id,
    name: property.name,
    coordinates: { latitude: property.latitude, longitude: property.longitude },
  }))

  const scheduleData = await fetchScheduleData(locations)

  return (
    <main className="p-4">
      <Header title="Mapa de Pulverizações">
        <HeaderClient locations={locations} />
      </Header>

      <div className="mt-4">
        <MapClient properties={properties} scheduleData={scheduleData} />
      </div>
    </main>
  )
}
