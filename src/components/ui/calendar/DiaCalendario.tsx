import React from "react";

import PulverizacaoBadge, {
  PulverizacaoBadgeProps,
} from "@/components/ui/calendar/PulverizacaoBadge";

interface DiaCalendarioProps {
  diaInfo: {
    dia: number;
    mesAtual: boolean;
  };
  pulverizacao: PulverizacaoBadgeProps["pulverizacao"] | null;
}

const DiaCalendario: React.FC<DiaCalendarioProps> = ({ diaInfo, pulverizacao }) => {
  return (
    <div
      className={`
        relative min-h-16 border-r border-b border-border last:border-r-0 p-2
        ${
          diaInfo.mesAtual
            ? "bg-card hover:bg-muted/30 transition-colors"
            : "bg-muted/20"
        }
        ${pulverizacao ? "cursor-pointer" : ""}
      `}
    >
      <div className="flex flex-col h-full">
        <span
          className={`
            text-xs font-medium mb-1
            ${diaInfo.mesAtual ? "text-foreground" : "text-muted-foreground"}
          `}
        >
          {diaInfo.dia}
        </span>

        {pulverizacao ? (
          <PulverizacaoBadge pulverizacao={pulverizacao} />
        ) : null}
      </div>
    </div>
  );
};

export default DiaCalendario;