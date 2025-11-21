"use client"

import { PropertyList } from '@/components/property/PropertyList'

export default function MinhasPropriedades() {
  return (
    <div className="relative h-[calc(100vh-theme(spacing.32))] z-0 overflow-auto">
      <PropertyList />
    </div>
  )
}
