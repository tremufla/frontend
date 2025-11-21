import { ApplicationScheduleMapPointDto } from "./ApplicationScheduleMapPointDto";

export type ApplicationScheduleByRiskDto = {
  danger: ApplicationScheduleMapPointDto[];
  warning: ApplicationScheduleMapPointDto[];
  safe: ApplicationScheduleMapPointDto[];
}
