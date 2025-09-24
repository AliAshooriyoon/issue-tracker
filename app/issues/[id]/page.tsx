import { ChangeIssue } from "@/app/components/ChangeIssue";
import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
const Issue = async ({ params }: { params: { id: string } }) => {
  const res = await fetch("http://localhost:3000/api/issues")
  if (!res.ok) {
    throw new Error("Connection faild!");
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
  console.log("Issue Data : ---------------------")
  console.log(issue)


  //----------- Space ------------------
  // Edit Issue data



  return <>
    {issue && <ChangeIssue issueData={issue} />}
  </>
}
export default Issue;
