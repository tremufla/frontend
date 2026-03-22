import React from "react";

import SprayBadge, {
  SprayBadgeProps,
} from "@/components/ui/calendar/SprayBadge";

interface DiaCalendarioProps {
  diaInfo: {
    dia: number;
    mesAtual: boolean;
  };
  spray: SprayBadgeProps["spray"] | null;
}

const DiaCalendario: React.FC<DiaCalendarioProps> = ({ diaInfo, spray }) => {
  return (
    <div
      className={`
        relative min-h-16 border-r border-b border-border last:border-r-0 p-2
        ${
          diaInfo.mesAtual
            ? "bg-card hover:bg-muted/30 transition-colors"
            : "bg-muted/20"
        }
        ${spray ? "cursor-pointer" : ""}
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

        {spray ? (
          <SprayBadge spray={spray} />
        ) : null}
      </div>
    </div>
  );
};

export default DiaCalendario;
