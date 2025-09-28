import { ChangeIssue } from "@/app/components/ChangeIssue";
import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IssuePageProps {
  params: {
    id: string;
  };
}

const Issue = async ({ params }: IssuePageProps) => {
  const res = await fetch("http://localhost:3000/api/issues", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Connection failed!");
  }

  const data = await res.json();

  const slug: string = params.id; // Issue Name + Issue ID
  const slugArray = slug.split("-");

  const issueId: number = Number(slugArray[slugArray.length - 1]);

  const valid = data.find((e: DataType) => e.slug === slug);
  if (!valid) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });

  return <>{issue && <ChangeIssue issueData={issue} />}</>;
};

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker project",
};

export default Issue;
