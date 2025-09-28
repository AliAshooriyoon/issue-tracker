"use client";

import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type UseFormType = {
  title: string;
  description: string;
};

// Dynamic import to prevent SSR errors
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function NewIssue() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const formHook = useForm<UseFormType>();
  const { register, handleSubmit, control } = formHook;

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) router.push("/api/auth/signin");
  }, [session, status, router]);

  const setData = async (data: UseFormType) => {
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      router.push("/issues");
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading" || !session?.user?.id) return <div>Loading...</div>;

  return (
    <form className="space-y-4 max-w-96 mx-auto" onSubmit={handleSubmit(setData)}>
      <TextField.Root {...register("title")} placeholder="Title">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE {...field} className="color-white bg-white" />}
      />

      <Button>Create Issue</Button>
    </form>
  );
}
