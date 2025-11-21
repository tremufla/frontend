"use client"

import * as React from "react"
import { faker } from "@faker-js/faker"
import { PropertyModel } from "@/domain/models/property-model"
import { PropertyCard } from "@/components/property/PropertyCard"

export function PropertyList() {
  const [properties, setProperties] = React.useState<PropertyModel[]>([])

  React.useEffect(() => {
    // gerar alguns dados de exemplo localmente
    const items: PropertyModel[] = Array.from({ length: 6 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      longitude: Number(faker.location.longitude()),
      latitude: Number(faker.location.latitude()),
    }))

    setProperties(items)
  }, [])

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
