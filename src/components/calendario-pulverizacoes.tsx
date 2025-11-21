"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DiasSemanaHeader from "@/components/ui/calendar/DiasSemanaHeader";
import DiasCalendario from "@/components/ui/calendar/DiasCalendario";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const pulverizacoes = {
  1: { tipo: "programada", produto: "Herbicida", horario: "06:00" },
  10: { tipo: "cancelada", produto: "Fungicida", horario: "14:00" },
  15: { tipo: "concluida", produto: "Inseticida", horario: "08:30" },
  22: { tipo: "programada", produto: "Adubo Foliar", horario: "07:00" },
  28: { tipo: "concluida", produto: "Herbicida", horario: "06:30" },
};

export function CalendarioPulverizacoes() {
  const [mesAtual, setMesAtual] = useState(9); // Julho (índice 6)
  const [anoAtual, setAnoAtual] = useState(2025);

  const obterDiasDoMes = (mes: number, ano: number) => {
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaInicio = primeiroDia.getDay();

    const dias = [];

    // Adicionar dias vazios do início
    for (let i = 0; i < diaSemanaInicio; i++) {
      const diaAnterior = new Date(ano, mes, -diaSemanaInicio + i + 1);
      dias.push({ dia: diaAnterior.getDate(), mesAtual: false });
    }

    // Adicionar dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      dias.push({ dia, mesAtual: true });
    }

    return dias;
  };

  const navegarMes = (direcao: "anterior" | "proximo") => {
    if (direcao === "anterior") {
      if (mesAtual === 0) {
        setMesAtual(11);
        setAnoAtual(anoAtual - 1);
      } else {
        setMesAtual(mesAtual - 1);
      }
    } else {
      if (mesAtual === 11) {
        setMesAtual(0);
        setAnoAtual(anoAtual + 1);
      } else {
        setMesAtual(mesAtual + 1);
      }
    }
  };

  const dias = obterDiasDoMes(mesAtual, anoAtual);

  return (
    <div className="relative h-[calc(100vh-theme(spacing.32))]">
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navegarMes("anterior")}
              className="hover:bg-primary/10 cursor-pointer"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">
                {meses[mesAtual]}
              </h2>
              <p className="text-sm text-muted-foreground">{anoAtual}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navegarMes("proximo")}
              className="hover:bg-primary/10 cursor-pointer"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <DiasSemanaHeader />
            <DiasCalendario dias={dias} pulverizacoes={pulverizacoes} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
