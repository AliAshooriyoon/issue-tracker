import { ChangeIssue } from "@/app/components/ChangeIssue";
import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
const Issue = async ({ params }: { params: { id: string } }) => {
  const res = await fetch("http://localhost:3000/api/issues")
  if (!res.ok) {
    throw new Error("Connection faild!");
  }
  const data = await res.json();
  const resolvedParams = await params;
  const slug: string = resolvedParams.id;  // Issue Name + Issue ID;
  const slugArray = slug.split('-')

  const issueId: number = Number(slugArray[slugArray.length - 1])
  const valid = data.find((e: DataType) => {
    return e.slug == slug
  })
  if (!valid) {
    notFound()
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId
    }
  })


  //----------- Space ------------------
  // Edit Issue data
  // Delete Button

  const removeAction = (idToRemove: number) => {
    console.log(idToRemove)
  }


  return <>
    {issue && <ChangeIssue issueData={issue} />}
  </>
}

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker project"
};


export default Issue;
