
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ptBR } from 'date-fns/locale';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CalendarInputFormProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label: string;
  description?: string;
  disabled?: (date: Date) => boolean;
};

export const CalendarInputForm: React.FC<CalendarInputFormProps> = ({
  value,
  onChange,
  label,
  description,
  disabled,
}) => {
  return (
    <FormItem className="flex-col grid gap-4">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              {value ? format(value, "PPP", { locale: ptBR }) : <span>Escolha a data</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled}
            locale={ptBR}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
