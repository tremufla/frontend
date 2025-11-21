import Header from "@/components/ui/header/hearder";
import SelectLocation from "@/components/ui/selects/SelectLocation";

const locations = [
  {
    id: "399821bb-1db2-40ac-9705-7507681d47dc",
    name: "Minha localização",
    coordinates: {
      latitude: -20.899349709981426,
      longitude: -46.99061049779196,
    },
  },
  {
    id: "b8389d16-3e43-4207-a02f-45f821b39042",
    name: "Fazenda Sol Nascente",
    coordinates: {
      latitude: -21.232089043346647,
      longitude: -44.99445408674582,
    },
  },
  {
    id: "190cf364-9e35-4ce6-bc48-e7a0821a6db2",
    name: "Fazenda Laranjal",
    coordinates: {
      latitude: -21.161141367126774,
      longitude: -44.92431764431109,
    },
  },
];

export default function ScheduleHeader() {
  return (
    <Header title="Calendário de Pulverizações">
      <SelectLocation locations={locations} />
    </Header>
  );
}
