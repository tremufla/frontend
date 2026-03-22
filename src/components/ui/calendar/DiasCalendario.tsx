import DiaCalendario from "@/components/ui/calendar/DiaCalendario";

interface DiasCalendarioProps {
  dias: {
    dia: number;
    mesAtual: boolean;
  }[];
  sprays: Record<number, Spray>;
}

interface Spray {
  type: string;
  product: string;
  time: string;
}

const DiasCalendario: React.FC<DiasCalendarioProps> = ({ dias, sprays }) => {
  return (
    <div className="grid grid-cols-7">
      {dias.map((diaInfo, index) => {
        const spray = diaInfo.mesAtual
          ? sprays[diaInfo.dia as keyof typeof sprays]
          : null;

        return (
          <DiaCalendario
            key={index}
            diaInfo={diaInfo}
            spray={spray}
          />
        );
      })}
    </div>
  );
};

export default DiasCalendario;
