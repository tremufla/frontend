import React from "react";

import { Badge } from "@/components/ui/badge";
import { Bug, Droplet, Leaf, Zap } from "lucide-react";

export interface SprayBadgeProps {
  spray: {
    type: string;
    product: string;
    time: string;
  }
}

const SprayBadge: React.FC<SprayBadgeProps> = ({ spray }) => {
  const { type, product, time } = spray;

  const getStatusColor = (type: string) => {
    switch (type) {
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

  const getProductIcon = (product: string) => {
    if (product.includes("Herbicida")) return <Leaf className="h-3 w-3" />;
    if (product.includes("Fungicida")) return <Droplet className="h-3 w-3" />;
    if (product.includes("Inseticida")) return <Bug className="h-3 w-3" />;
    if (product.includes("Adubo")) return <Zap className="h-3 w-3" />;
    return <Droplet className="h-3 w-3" />;
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      <Badge
        variant="secondary"
        className={`
        ${getStatusColor(type)}
        text-xs px-1.5 py-0.5 rounded-sm flex items-center gap-1
        shadow-sm border-0
      `}
      >
        {getProductIcon(product)}
        <span className="truncate text-xs">{product}</span>
      </Badge>
      <div className="text-xs text-muted-foreground mt-0.5">
        <div>{time}</div>
      </div>
    </div>
  );
};

export default SprayBadge;
