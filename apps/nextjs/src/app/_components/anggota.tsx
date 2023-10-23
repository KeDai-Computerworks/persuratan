"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { anggotaCreateSchema } from "@acme/api/schema/anggota";
import { Icons } from "@acme/ui/components/icons";
import { Alert } from "@acme/ui/components/ui/alert";
// import {} from ""
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@acme/ui/components/ui/avatar";
import { Button } from "@acme/ui/components/ui/button";
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
import { Separator } from "@acme/ui/components/ui/separator";

import { api } from "~/trpc/react";
import type { RouterOutputs } from "~/trpc/shared";

export type IAnggotas = RouterOutputs["anggota"]["all"];
export type IAnggota = RouterOutputs["anggota"]["byId"];

export const AnggotaList = (props: { anggotas: IAnggotas }) => {
  const {
    data: anggotas,
    isLoading,
    isError,
  } = api.anggota.all.useQuery(undefined, {
    initialData: props.anggotas,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loadingr</div>;
  }

  if (anggotas.length == 0) {
    return (
      <div className="mt-24 grid place-items-center gap-4">
        <h1 className="text-xl">Anggota Masih Kosong</h1>
        <Button asChild className="flex gap-2">
          <Link href={"/anggota/create"}>
            Create Anggota <Icons.plus />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Anggota</h1>
        <Button asChild className="flex gap-2" size="icon" variant="outline">
          <Link href={"/anggota/create"}>
            <Icons.plus />
          </Link>
        </Button>
      </div>
      <Separator />
      {/* content */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {anggotas.map((anggota) => (
          <Link key={anggota.id} href={"/anggota/" + anggota.id}>
            <Alert className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={anggota.user?.image ?? "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {anggota.nra.split(".").at(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm uppercase">
                  <h1 className="font-semibold">{anggota.nama}</h1>
                  <h2 className="text-muted-foreground font-medium">
                    {anggota.nra}
                  </h2>
                </div>
              </div>
              <h2 className="flex flex-row gap-1 font-semibold">
                {anggota.surat.length} <Icons.paper />
              </h2>
            </Alert>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const AnggotaCreate = () => {
  return (
    <div>
      <h1>Anggota Create</h1>
      <AnggotaForm />
    </div>
  );
};

interface AnggotaProps {
  anggota: IAnggota;
}

export const AnggotaUpdate = ({ anggota }: AnggotaProps) => {
  return (
    <div>
      <h1>Anggota Create</h1>
      <AnggotaForm anggota={anggota} />
    </div>
  );
};

export const AnggotaDetail = ({ anggota }: AnggotaProps) => {
  return <div>Anggota {JSON.stringify(anggota, null, 2)}</div>;
};

interface AnggotaFormProps {
  anggota?: IAnggota;
}

export const AnggotaForm = ({ anggota }: AnggotaFormProps) => {
  const form = useForm<z.infer<typeof anggotaCreateSchema>>({
    resolver: zodResolver(anggotaCreateSchema),
    defaultValues: {
      nama: anggota?.nama,
      nim: anggota?.nim,
      nra: anggota?.nra,
    },
  });

  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: mutateCreate } = api.anggota.create.useMutation();
  const { mutateAsync: mutateUpdate } = api.anggota.update.useMutation();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof anggotaCreateSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);

    if (anggota) {
      await mutateUpdate({ id: anggota.id, ...values });
      setLoading(false);
      return;
    }

    await mutateCreate(values);
    setLoading(false);
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nama"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nim"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nim</FormLabel>
              <FormControl>
                <Input placeholder="191232" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nra"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>NRA</FormLabel>
              <FormControl>
                <Input placeholder="911.KD.XIX.20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
};
