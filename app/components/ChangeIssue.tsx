'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

type IssueType = {
  id: number;
  slug: string | null;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ChangeIssue = ({ issueData: issue }: { issueData: IssueType }) => {
  const [newTitle, setNewTitle] = useState(issue?.title)
  const [newDescription, setNewDescription] = useState(issue?.description)
  const router = useRouter()
  const changeIssueData = async () => {
    const res = await fetch("/api/issues/update-issue",
      { method: "PATCH", body: JSON.stringify({ id: issue.id, title: newTitle, description: newDescription }) })
    const data = (await res).json()
    console.log(data)
    router.push('/issues')
  }
  const getDelete = async (inp: number) => {
    const res = await fetch("/api/issues/remove-issue",
      { method: "DELETE", body: JSON.stringify({ id: inp }) })
    const data = await res.json()
    console.log(data)
    router.push('/issues')
  }
  return <>
    <div className='text-white pl-6 py-8'>
      <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" className=" min-w-[20%] text-2xl outline-0 border-2 
        py-1 px-4 rounded-xl" placeholder={issue?.title} />
      <div className=''></div>
      {/* <EditForm value={issue?.description} /> */}
      <textarea onChange={(e) => setNewDescription(e.target.value)} value={newDescription} className="my-6 w-[70%] min-h-64 border-2 rounded-2xl
        p-4 outline-0 shadow-2xl shadow-stone-500"/>

      <div className="btn_box  flex flex-row gap-6">
        <button onClick={changeIssueData} className={`hover:bg-zinc-100 delay-100 hover:text-black
          hover:border-black outline-0 border-2 block py-2 px-4
          my-4 rounded-2xl cursor-pointer`} type="button">Submit changes</button>
        <button onClick={() => getDelete(Number(issue?.id))} className={`hover:bg-red-400 delay-100 flex-wrap hover:text-black
          hover:border-black outline-0 border-2 block py-2 px-4
          my-4 rounded-2xl cursor-pointer bg-red-600`} type="button">Delete Issue</button>

      </div>
      <p className="">Created At : {issue?.createdAt.toString()}</p>
    </div >

  </>
};
