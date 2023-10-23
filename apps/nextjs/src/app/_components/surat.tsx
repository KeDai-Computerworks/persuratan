"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { suratSkSchema } from "@acme/api/schema/surat";
import { cn } from "@acme/tailwind-config/lib/utils";
import { Icons } from "@acme/ui/components/icons";
import { Button } from "@acme/ui/components/ui/button";
import { Calendar } from "@acme/ui/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/components/ui/form";
// import { Alert } from "@acme/ui/components/ui/alert";
import { Input } from "@acme/ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/components/ui/popover";

import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/shared";

export type ISurats = RouterOutputs["surat"]["all"];
export type ISurat = RouterOutputs["surat"]["byId"];

export const SuratList = (props: { surats: ISurats }) => {
  const {
    data: surats,
    isLoading,
    isError,
  } = api.surat.all.useQuery(
    { queryBy: "all" },
    {
      initialData: props.surats,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loadingr</div>;
  }

  if (surats.length == 0) {
    return (
      <div className="mt-24 grid place-items-center gap-4">
        <h1 className="text-xl">Surat Masih Kosong</h1>
        <Button asChild className="flex gap-2">
          <Link href={"/surat/create"}>
            Create Surat <Icons.plus />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {surats.map((v) => (
        <div key={v.id}>{v.nomorSurat}</div>
      ))}
    </div>
  );
};

export const SuratCreate = () => {
  return (
    <div>
      <h1>Surat Create</h1>
      <SuratSKForm />
    </div>
  );
};

export const SuratUpdate = ({ surat }: { surat: ISurat }) => {
  return (
    <div>
      <h1>Surat Create</h1>
      <SuratSKForm />
    </div>
  );
};

export const SuratDetail = () => {
  return <div>Surat</div>;
};

export const SuratSKForm = () => {
  const form = useForm<z.infer<typeof suratSkSchema>>({
    resolver: zodResolver(suratSkSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof suratSkSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="perihal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggal"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
