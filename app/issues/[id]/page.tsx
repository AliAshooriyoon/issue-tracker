import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
const Issue = async ({ params }: { params: { id: string } }) => {
  const res = await fetch("http://localhost:3000/api/issues")
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
    <div className='text-white'>
      <h1 className="text-2xl">{issue?.title}</h1>
      <div className=''>
        <p className="">{issue?.description}</p>
        {issue?.createdAt.toString()}
      </div>

    </div>
  </>
}
export default Issue;
