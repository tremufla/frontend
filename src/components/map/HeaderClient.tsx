"use client"

import React from 'react'
import SelectLocation from '@/components/ui/selects/SelectLocation'
import NewPulverizationPopover from '@/components/ui/popovers/NewPulverizationPopover'

type Location = {
  id: string
  name: string
  coordinates: { latitude: number; longitude: number }
}

export default function HeaderClient({ locations }: { locations: Location[] }) {
  return (
    <>
      <SelectLocation locations={locations} />
      <NewPulverizationPopover />
    </>
  )
}
