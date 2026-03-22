'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PropertyModel } from '@/domain/models/property-model';
import { useGeolocationStore } from '@/store/geolocation-store';
import { CalendarIcon, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

const CURRENT_LOCATION_ID = 'current-location';

const SPRAY_TYPES = [
  { value: 'herbicida', label: 'Herbicida' },
  { value: 'fungicida', label: 'Fungicida' },
  { value: 'inseticida', label: 'Inseticida' },
  { value: 'acaricida', label: 'Acaricida' },
  { value: 'nematicida', label: 'Nematicida' },
  { value: 'fertilizante_foliar', label: 'Fertilizante foliar' },
  { value: 'outro', label: 'Outro' },
];

const FormSchema = z.object({
  propertyId: z.string().optional(),
  sprayType: z.string({ required_error: 'Selecione o tipo de pulverização' }).min(1, 'Selecione o tipo de pulverização'),
  date: z.date({ required_error: 'Escolha a data' }),
  activeIngredients: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: PropertyModel[];
};

export default function NewSprayModal({ open, onOpenChange, properties }: Props) {
  const { coordinates: userLocation } = useGeolocationStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (data: FormValues) => {
    const { propertyId, ...rest } = data;
    const isCurrentLocation = propertyId === CURRENT_LOCATION_ID;

    const payload = {
      ...rest,
      ...(!isCurrentLocation && propertyId ? { propertyId } : {}),
      ...(isCurrentLocation && userLocation ? { coordinates: userLocation } : {}),
    };

    if (process.env.NODE_ENV === 'development') {
      toast('Pulverização agendada (mock):', {
        description: (
          <pre className="mt-2 rounded-md bg-slate-950 p-4 whitespace-pre-wrap break-all">
            <code className="text-white">{JSON.stringify(payload, null, 2)}</code>
          </pre>
        ),
      });
    } else {
      await fetch('/api/sprays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    form.reset();
    onOpenChange(false);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>Nova pulverização</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Propriedade a ser pulverizada</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a propriedade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userLocation && (
                        <SelectItem value={CURRENT_LOCATION_ID}>
                          <span className="flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-orange-500" />
                            Localização atual
                          </span>
                        </SelectItem>
                      )}
                      {properties.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sprayType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de pulverização</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de pulverização" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SPRAY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da pulverização</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, 'dd/MM/yyyy', { locale: ptBR })
                            : 'Selecione a data'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        locale={ptBR}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="activeIngredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Princípios ativos a serem utilizados</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite os princípios a serem utilizados"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-xs text-muted-foreground">
              Ao clicar em Salvar, você concorda com a política de dados do aplicativo.
            </p>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-xl border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-500"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
              >
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
