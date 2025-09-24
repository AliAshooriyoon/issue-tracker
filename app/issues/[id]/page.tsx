import EditForm from "@/app/components/EditForm";
import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
const Issue = async ({ params }: { params: { id: string } }) => {
  const res = await fetch("http://localhost:3000/api/issues")
  if (!res.ok) {
    throw new Error("Connection faild!")
  }
  const data = await res.json();
  const resolvedParams = await params;
  const slug: string = resolvedParams.id;  // Issue Name + Issue ID;
  console.log(slug.split("-"))
  const slugArray = slug.split('-')

  const issueId: number = Number(slugArray[slugArray.length - 1])
  const valid = data.find((e: DataType) => {
    return e.slug == slug
  })
  console.log(valid)
  if (!valid) {
    notFound()
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId
    }
  })
  console.log(issue)
  return <>
    <div className='text-white pl-6'>
      <input type="text" className="text-2xl outline-0 border-2 py-1 px-4 rounded-xl" value={issue?.title} />
      <div className=''>
        {/* <textarea className="w-[70%] min-h-64 border-2 rounded-2xl p-4 outline-0 shadow-2xl shadow-stone-500"></textarea> */}

      </div>
      <EditForm value={issue?.description} />

      <p className="">{issue?.createdAt.toString()}</p>
    </div >
  </>
}
export default Issue;
