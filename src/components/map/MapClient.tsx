'use client';

import 'leaflet/dist/leaflet.css';
import React from 'react';
import dynamic from 'next/dynamic';
import { PropertyModel } from '@/domain/models/property-model';
import { ApplicationScheduleByRiskModel } from '@/domain/models/application-schedule-by-risk-model';

const Map = dynamic(() => import('@/components/ui/map/Map'), { ssr: false });

export default function MapClient({
  properties,
  scheduleData,
}: {
  properties?: PropertyModel[];
  scheduleData?: ApplicationScheduleByRiskModel;
}) {
  return <Map properties={properties} scheduleData={scheduleData} />;
}
