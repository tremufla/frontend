"use client"

import 'leaflet/dist/leaflet.css'
import React from 'react'
import dynamic from 'next/dynamic'
import { PropertyModel } from '@/domain/models/property-model'

const Map = dynamic(() => import('@/components/ui/map/Map'), { ssr: false })

export default function MapClient({ properties }: { properties?: PropertyModel[] }) {
  return <Map properties={properties} />
}
