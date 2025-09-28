"use client"
import { Button, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form"
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Metadata } from "next";
type UseFormType = {
  title: string;
  description: string;
}
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })
const NewIssue = () => {
  const { data } = useSession()
  if (!data?.user?.id) {
    redirect('/api/auth/signin')
  }
  const formHook = useForm<UseFormType>()
  const register = formHook.register;
  const handleFunc = formHook.handleSubmit;
  const control = formHook.control;
  const router = useRouter()
  const setData = async (data: UseFormType) => {
    try {
      const res = await fetch("/api/issues", { method: "POST", body: JSON.stringify(data) })
      if (!res.ok) {
        throw new Error(`Error message : ${res.status} `)
      }
      const result = await res.json()

      if (result.id) {
        router.push("/issues")
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return <>
    <form className="space-y-4 max-w-96 mx-auto" onSubmit={handleFunc(setData)}>
      <TextField.Root {...register("title")} className="" placeholder="Title">
        <TextField.Slot>
          {/* <MagnifyingGlassIcon height="16" width="16" /> */}
        </TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE {...field} className="color-white bg-white" />}
      />
      <Button>Create Issue</Button>
    </form>
  </>
}



export default NewIssue;
