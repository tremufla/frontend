"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
} from "@/components/ui/form";
import { toast } from "sonner";
import { CalendarInputForm } from "../form/CalendarInputForm";
import { usePropertyStore } from "@/store/property-store";

const FormSchema = z.object({
  data: z.date({
    required_error: "É necessário informar uma data, para agendar a pulverização",
  }),
  property: z.string().optional(),
});

export function CalendarForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const property = usePropertyStore.getState().property;

    const payload = {
      ...data,
      property,
    };

    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(payload, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <CalendarInputForm
              value={field.value}
              onChange={field.onChange}
              label="Data da pulverização:"
              disabled={(date) => date < new Date()}
            />
          )}
        />
        <FormDescription>
          Ao clicar em Salvar, você concorda com a política de dados do
          aplicativo.
        </FormDescription>
        <Button className="cursor-pointer" type="submit">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
