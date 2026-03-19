'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { PropertyModel } from '@/domain/models/property-model';
import { Home, Navigation, X } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  properties?: PropertyModel[];
  userLocation?: [number, number] | null;
  selectedId?: string | 'user-location';
  onSelect?: (property: PropertyModel) => void;
  onSelectUserLocation?: () => void;
};

export default function MyLocationsModal({ open, onOpenChange, properties, userLocation, selectedId, onSelect, onSelectUserLocation }: Props) {
  const hasItems = !!userLocation || !!properties?.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Minha localização</DialogTitle>
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
                className={`flex items-center gap-3 rounded-md border p-3 text-sm cursor-pointer transition-colors ${
                  selectedId === 'user-location' ? 'border-orange-500' : 'border-border hover:bg-muted'
                }`}
                onClick={() => onSelectUserLocation?.()}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 shrink-0">
                  <Navigation className="w-4 h-4 text-white" />
                </span>
                <span className="font-medium text-sm">Localização atual</span>
              </li>
            )}
            {properties?.map((property) => (
              <li
                key={property.id}
                className={`flex items-center gap-3 rounded-md border p-3 text-sm cursor-pointer transition-colors ${
                  selectedId === property.id ? 'border-orange-500' : 'border-transparent hover:bg-muted'
                }`}
                onClick={() => onSelect?.(property)}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 shrink-0">
                  <Home className="w-4 h-4 text-white" />
                </span>
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
