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

const sprays = {
  1: { type: "programada", product: "Herbicida", time: "06:00" },
  10: { type: "cancelada", product: "Fungicida", time: "14:00" },
  15: { type: "concluida", product: "Inseticida", time: "08:30" },
  22: { type: "programada", product: "Adubo Foliar", time: "07:00" },
  28: { type: "concluida", product: "Herbicida", time: "06:30" },
};

export function SprayCalendar() {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2025);

  const getMonthDays = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekday = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startWeekday; i++) {
      const prevDay = new Date(year, month, -startWeekday + i + 1);
      days.push({ dia: prevDay.getDate(), mesAtual: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ dia: day, mesAtual: true });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const days = getMonthDays(currentMonth, currentYear);

  return (
    <div className="relative h-[calc(100vh-theme(spacing.32))]">
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="hover:bg-primary/10 cursor-pointer"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">
                {meses[currentMonth]}
              </h2>
              <p className="text-sm text-muted-foreground">{currentYear}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="hover:bg-primary/10 cursor-pointer"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <DiasSemanaHeader />
            <DiasCalendario dias={days} sprays={sprays} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
