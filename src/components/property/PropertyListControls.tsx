'use client'

import React, { useState } from 'react'
import NewPropertyForm from '@/components/property/NewPropertyForm'
import { Button } from '@/components/ui/button'

export default function PropertyListControls() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <NewPropertyForm open={open} onOpenChange={setOpen} hideTrigger />

      <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
        <Button
          className="rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
          onClick={() => setOpen(true)}
          aria-label="Nova propriedade"
        >
          +
        </Button>
      </div>
    </>
  )
}
