"use client"
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form"
type UseFormType = {
  title: string;
  description: string;
}
const NewIssue = () => {

  const formHook = useForm<UseFormType>()
  const register = formHook.register;
  const handleFunc = formHook.handleSubmit;
  const control = formHook.control;

  const setData = async (data: UseFormType) => {
    try {
      const res = await fetch("/api/issues/", { method: "POST", body: JSON.stringify(data) })
      if (!res.ok) {
        throw new Error(`Error message : ${res.status} `)
      }
      const result = await res.json()
      if (result.id) {
      }
    } catch (error) {
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
