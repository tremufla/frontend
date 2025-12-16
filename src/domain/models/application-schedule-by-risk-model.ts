import { ApplicationScheduleMapPointModel } from './application-schedule-map-point-model'

export type ApplicationScheduleByRiskModel = {
  danger: ApplicationScheduleMapPointModel[]
  warning: ApplicationScheduleMapPointModel[]
  safe: ApplicationScheduleMapPointModel[]
}
