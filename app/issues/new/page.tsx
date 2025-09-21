import { TextArea, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const NewIssue = () => {
  return <>
    <div className="space-y-4">

      <TextField.Root placeholder="Title">
        <TextField.Slot>
          {/* <MagnifyingGlassIcon height="16" width="16" /> */}
        </TextField.Slot>
      </TextField.Root>

      <TextArea placeholder="Descriotion" />
    </div>
  </>
}
export default NewIssue;
