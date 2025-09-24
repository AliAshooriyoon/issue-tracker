"use client"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const EditForm = ({ value }: { value: string }) => {
  return <>
    <div className=''>
      <SimpleMDE className="text-white w-[80%] my-12 " value={value} />
    </div>
  </>
}
export default EditForm;
