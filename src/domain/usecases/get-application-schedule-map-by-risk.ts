import { ApplicationScheduleByRiskModel } from '@/domain/models/application-schedule-by-risk-model'

export type Location = { latitude: number; longitude: number }

export interface GetApplicationScheduleMapByRisk {
  mapView(location?: Location): Promise<ApplicationScheduleByRiskModel>
}
