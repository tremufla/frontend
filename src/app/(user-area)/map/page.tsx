import MapClient from '@/components/map/MapClient'
// Evita prerender durante o build. Ajuste/remoção após investigar a causa raiz
export const dynamic = 'force-dynamic'
import { makeRemoteGetAllProperties } from '@/main/factories/usecases/remote-get-all-properties-factory'

export default async function MapaPulverizacoes() {
  const getAll = makeRemoteGetAllProperties()
  const properties = await getAll.getAll()

  return (
    <div className="relative h-[calc(100vh-theme(spacing.32))] z-0">
      <MapClient properties={properties} />
    </div>
  )
}
