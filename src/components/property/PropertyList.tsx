import * as React from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { makeRemoteGetAllProperties } from '@/main/factories/usecases/remote-get-all-properties-factory';
import PropertyListControls from '@/components/property/PropertyListControls';

export async function PropertyList() {
  const getAllProperties = makeRemoteGetAllProperties();

  const properties = await getAllProperties.getAll();

  return (
    <div className="p-6">
      <PropertyListControls />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
