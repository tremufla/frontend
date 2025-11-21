"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../button";
import { Plus } from "@mynaui/icons-react";
import { CalendarForm } from "../calendar/PulverizationCalendar";

const NewPulverizationPopover: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">
          <Plus />
          <span className="hidden sm:inline">Nova pulverização</span>
          </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <CalendarForm />
      </PopoverContent>
    </Popover>
  );
};

export default NewPulverizationPopover;
