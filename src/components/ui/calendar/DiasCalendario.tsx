import DiaCalendario from "@/components/ui/calendar/DiaCalendario";

interface DiasCalendarioProps {
  dias: {
    dia: number;
    mesAtual: boolean;
  }[];
  pulverizacoes: Record<number, Pulverizacao>;
}

interface Pulverizacao {
  tipo: string;
  produto: string;
  horario: string;
}

const DiasCalendario: React.FC<DiasCalendarioProps> = ({ dias, pulverizacoes }) => {
  return (
    <div className="grid grid-cols-7">
      {dias.map((diaInfo, index) => {
        const pulverizacao = diaInfo.mesAtual
          ? pulverizacoes[diaInfo.dia as keyof typeof pulverizacoes]
          : null;

        return (
          <DiaCalendario
            key={index}
            diaInfo={diaInfo}
            pulverizacao={pulverizacao}
          />
        );
      })}
    </div>
  );
};

export default DiasCalendario;