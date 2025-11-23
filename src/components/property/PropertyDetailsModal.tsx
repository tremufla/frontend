'use client'

import React, { useEffect, useState } from 'react'
import { getProperty, updateProperty } from '@/lib/api/propertyApi'
import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldContent, FieldError } from '@/components/ui/field'
import { useForm } from 'react-hook-form'
import { PropertyModel } from '@/domain/models/property-model'
import { PiPencilSimple, PiFloppyDisk } from 'react-icons/pi'

type Props = {
  propertyId: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

type FormValues = {
  name?: string
  city?: string
  state?: string
  latitude?: number
  longitude?: number
}

export default function PropertyDetailsModal({ propertyId, open: controlledOpen, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [property, setProperty] = useState<PropertyModel | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: {} })

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getProperty(propertyId)
      setProperty(data)
      reset(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (controlledOpen) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledOpen, propertyId])

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false)
  }

  const onSave = async (data: FormValues) => {
    setLoading(true)
    try {
      await updateProperty(propertyId, data)
      setEditing(false)
      await fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full">
        <form onSubmit={handleSubmit(onSave)}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Detalhes da propriedade</DialogTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setEditing((s) => !s)} type="button">
                  <PiPencilSimple />
                </Button>
                <DialogClose>
                  <Button variant="ghost">Fechar</Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <Field>
              <FieldLabel>Nome da propriedade</FieldLabel>
              <FieldContent>
                <Input {...register('name')} defaultValue={property?.name ?? ''} readOnly={!editing} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Cidade</FieldLabel>
              <FieldContent>
                <Input {...register('city')} defaultValue={property?.city ?? ''} readOnly={!editing} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Estado</FieldLabel>
              <FieldContent>
                <Input {...register('state')} defaultValue={property?.state ?? ''} readOnly={!editing} />
              </FieldContent>
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field>
                <FieldLabel>Latitude</FieldLabel>
                <FieldContent>
                  <Input {...register('latitude')} defaultValue={property?.latitude ?? 0} readOnly={!editing} />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Longitude</FieldLabel>
                <FieldContent>
                  <Input {...register('longitude')} defaultValue={property?.longitude ?? 0} readOnly={!editing} />
                </FieldContent>
              </Field>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose} type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={!editing || loading}>
              {editing ? (
                <span className="inline-flex items-center gap-2">
                  <PiFloppyDisk /> Salvar
                </span>
              ) : (
                'Salvar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
