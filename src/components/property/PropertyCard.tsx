"use client"

import * as React from "react"
import { useState } from "react"
import { PropertyModel } from "@/domain/models/property-model"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PiFarm } from "react-icons/pi"
import PropertyDetailsModal from "@/components/property/PropertyDetailsModal"

type Props = {
  property: PropertyModel
}

export function PropertyCard({ property }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card key={property.id} className="cursor-pointer" onClick={() => setOpen(true)}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-sm">
              <PiFarm color="white" size={32} aria-hidden />
            </div>
            <CardTitle className="!m-0">{property.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{property.city}, {property.state}</p>
        </CardContent>
      </Card>

      <PropertyDetailsModal propertyId={property.id} open={open} onOpenChange={setOpen} />
    </>
  )
}

export default PropertyCard
