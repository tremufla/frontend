'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { PropertyModel } from '@/domain/models/property-model';
import { MapPin, Navigation, X } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  properties?: PropertyModel[];
  userLocation?: [number, number] | null;
  onSelect?: (property: PropertyModel) => void;
  onSelectUserLocation?: () => void;
};

export default function MyLocationsModal({ open, onOpenChange, properties, userLocation, onSelect, onSelectUserLocation }: Props) {
  const hasItems = !!userLocation || !!properties?.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Meus Locais</DialogTitle>
          <DialogClose>
            <button className="rounded-md p-1 hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        {!hasItems ? (
          <p className="text-sm text-muted-foreground text-center py-6">Nenhuma localização disponível.</p>
        ) : (
          <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
            {userLocation && (
              <li
                className="flex items-center gap-3 rounded-md border border-border p-3 text-sm cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onSelectUserLocation?.()}
              >
                <Navigation className="w-4 h-4 shrink-0 text-muted-foreground" />
                <span className="font-medium">Minha localização</span>
              </li>
            )}
            {properties?.map((property) => (
              <li
                key={property.id}
                className="flex items-center gap-3 rounded-md border border-border p-3 text-sm cursor-pointer hover:bg-muted transition-colors"
                onClick={() => onSelect?.(property)}
              >
                <MapPin className="w-4 h-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium">{property.name}</span>
                  {property.city && property.state && (
                    <span className="text-muted-foreground text-xs">
                      {property.city}, {property.state}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
