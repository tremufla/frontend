const DiasSemanaHeader: React.FC = () => {
  const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];


  return (
    <div className="grid grid-cols-7 bg-muted/50">
      {diasSemana.map((dia) => (
        <div
          key={dia}
          className="p-2 text-center text-xs font-semibold text-muted-foreground border-r border-border last:border-r-0"
        >
          {dia}
        </div>
      ))}
    </div>
  );
};

export default DiasSemanaHeader;