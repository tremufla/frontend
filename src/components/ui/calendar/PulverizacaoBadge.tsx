import React from "react";

import { Badge } from "@/components/ui/badge";
import { Bug, Droplet, Leaf, Zap } from "lucide-react";

export interface PulverizacaoBadgeProps {
  pulverizacao: {
    tipo: string;
    produto: string;
    horario: string;
  }
}

const PulverizacaoBadge: React.FC<PulverizacaoBadgeProps> = ({ pulverizacao }) => {
  const { tipo, produto, horario } = pulverizacao;

  const obterCorIndicador = (tipo: string) => {
    switch (tipo) {
      case "programada":
        return "bg-warning text-warning-foreground";
      case "concluida":
        return "bg-success text-success-foreground";
      case "cancelada":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const obterIconeProduto = (produto: string) => {
    if (produto.includes("Herbicida")) return <Leaf className="h-3 w-3" />;
    if (produto.includes("Fungicida")) return <Droplet className="h-3 w-3" />;
    if (produto.includes("Inseticida")) return <Bug className="h-3 w-3" />;
    if (produto.includes("Adubo")) return <Zap className="h-3 w-3" />;
    return <Droplet className="h-3 w-3" />;
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      <Badge
        variant="secondary"
        className={`
        ${obterCorIndicador(tipo)}
        text-xs px-1.5 py-0.5 rounded-sm flex items-center gap-1
        shadow-sm border-0
      `}
      >
        {obterIconeProduto(produto)}
        <span className="truncate text-xs">{produto}</span>
      </Badge>
      <div className="text-xs text-muted-foreground mt-0.5">
        <div>{horario}</div>
      </div>
    </div>
  );
};

export default PulverizacaoBadge;
