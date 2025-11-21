"use client"

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { makeRemoteCreateProperty } from '@/main/factories/usecases/remote-create-property-factory'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldGroup,
} from '@/components/ui/field'

export default function NewPropertyForm() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const usecase = makeRemoteCreateProperty()

    try {
      await usecase.create({
        name,
        city,
        state: stateVal,
        latitude: Number(latitude) || 0,
        longitude: Number(longitude) || 0,
      })

      // refresh server component list
      router.refresh()
      setOpen(false)
      // reset fields
      setName('')
      setCity('')
      setStateVal('')
      setLatitude('')
      setLongitude('')
    } catch (err) {
      // TODO: mostrar feedback de erro
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="mb-4">
      <Button onClick={() => setOpen(true)}>Nova propriedade</Button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />

            <div className="relative z-50 w-full max-w-lg rounded-lg bg-popover p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Nova propriedade</h3>
                <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                  Fechar
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Field>
                  <FieldLabel>Nome</FieldLabel>
                  <FieldContent>
                    <Input required value={name} onChange={(e) => setName(e.target.value)} />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Cidade</FieldLabel>
                  <FieldContent>
                    <Input value={city} onChange={(e) => setCity(e.target.value)} />
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel>Estado</FieldLabel>
                  <FieldContent>
                    <Input value={stateVal} onChange={(e) => setStateVal(e.target.value)} />
                  </FieldContent>
                </Field>

                <FieldGroup className="grid grid-cols-2 gap-2">
                  <Field>
                    <FieldLabel>Latitude</FieldLabel>
                    <FieldContent>
                      <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel>Longitude</FieldLabel>
                    <FieldContent>
                      <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    </FieldContent>
                  </Field>
                </FieldGroup>

                <div className="flex items-center gap-2 justify-end">
                  <Button variant="outline" onClick={() => setOpen(false)} type="button">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
