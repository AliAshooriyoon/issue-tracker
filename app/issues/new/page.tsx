"use client"
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
interface NewIssueType {
  title: string;
  description: string;
}
const NewIssue = () => {
  const sendData = async (d: { title: string, description: string }) => {
    const res = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
      , body: JSON.stringify(d)
    })
    const data = await res.json()
    console.log(data)
  }
  return <>
    <form className="space-y-4 max-w-96 mx-auto" >
      <TextField.Root className="" placeholder="Title">
        <TextField.Slot>
          {/* <MagnifyingGlassIcon height="16" width="16" /> */}
        </TextField.Slot>
      </TextField.Root>
      <SimpleMDE className="color-white bg-white" />
      <Button>Create Issue</Button>
    </form>
  </>
}
export default NewIssue;
