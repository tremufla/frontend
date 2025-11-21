import { httpClient } from "../httpClient";
import { ApplicationScheduleByRiskDto } from "../types/ApplicationScheduleByRiskDto";

export const applicationScheduleApi = {
  mapView: async (): Promise<ApplicationScheduleByRiskDto> => {
    const { data } = await httpClient.get("/application-schedule");

    return data;
  },
};
