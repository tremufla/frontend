'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { makeRemoteCreateProperty } from '@/main/factories/usecases/remote-create-property-factory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldContent } from '@/components/ui/field';
import Dialog, {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';

export default function NewPropertyForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const usecase = makeRemoteCreateProperty();

    try {
      await usecase.create({
        name,
        city,
        state: stateVal,
        latitude: Number(latitude) || 0,
        longitude: Number(longitude) || 0,
      });

      // refresh server component list
      router.refresh();
      setOpen(false);
      // reset fields
      setName('');
      setCity('');
      setStateVal('');
      setLatitude('');
      setLongitude('');
    } catch (err) {
      // TODO: mostrar feedback de erro
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Nova propriedade</Button>
        </DialogTrigger>

        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-3">
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

            <div className="grid grid-cols-2 gap-2">
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
