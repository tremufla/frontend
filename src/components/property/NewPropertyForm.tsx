'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldContent, FieldError } from '@/components/ui/field';
import Dialog, {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
const schema = z.object({
  name: z.string().min(1, { message: 'Nome obrigatório' }),
  city: z.string().optional(),
  state: z.string().optional(),
  latitude: z.preprocess((v) => (v === '' || v === undefined ? undefined : Number(v)), z.number().min(-90).max(90)),
  longitude: z.preprocess((v) => (v === '' || v === undefined ? undefined : Number(v)), z.number().min(-180).max(180)),
});

type FormData = z.infer<typeof schema>;

export default function NewPropertyForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      city: '',
      state: '',
      latitude: 0 as unknown as number,
      longitude: 0 as unknown as number,
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        city: data.city ?? '',
        state: data.state ?? '',
        latitude: Number(data.latitude) || 0,
        longitude: Number(data.longitude) || 0,
      }

      // delegated API call
      const { createProperty } = await import('@/lib/api/propertyApi')
      await createProperty(payload)

      router.refresh()
      setOpen(false)
      reset()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null;

  return (
    <div className="mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Nova propriedade</Button>
        </DialogTrigger>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>Nova propriedade</DialogTitle>
              <DialogClose>
                <Button variant="ghost" size="sm">
                  Fechar
                </Button>
              </DialogClose>
            </DialogHeader>

            <div className="mb-3">
              <p className="text-sm mb-2">Informe a localização (latitude / longitude)</p>
            </div>

            <Field>
              <FieldLabel>Nome</FieldLabel>
              <FieldContent>
                <Input {...register('name')} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Cidade</FieldLabel>
              <FieldContent>
                <Input {...register('city')} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Estado</FieldLabel>
              <FieldContent>
                <Input {...register('state')} />
              </FieldContent>
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field>
                <FieldLabel>Latitude</FieldLabel>
                <FieldContent>
                  <Input {...register('latitude', { valueAsNumber: false })} />
                  {errors.latitude && <FieldError>{errors.latitude.message}</FieldError>}
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Longitude</FieldLabel>
                <FieldContent>
                  <Input {...register('longitude', { valueAsNumber: false })} />
                  {errors.longitude && <FieldError>{errors.longitude.message}</FieldError>}
                </FieldContent>
              </Field>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
