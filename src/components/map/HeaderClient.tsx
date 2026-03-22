"use client"

import React from 'react'
import SelectLocation from '@/components/ui/selects/SelectLocation'
import NewSprayPopover from '@/components/ui/popovers/NewSprayPopover'

export type Location = {
  id: string
  name: string
  coordinates: { latitude: number; longitude: number }
}

export default function HeaderClient({ locations }: { locations: Location[] }) {
  return (
    <>
      <SelectLocation locations={locations} />
      <NewSprayPopover />
    </>
  )
}
