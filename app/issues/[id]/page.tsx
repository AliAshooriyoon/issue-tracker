import { ChangeIssue } from "@/app/components/ChangeIssue";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

const Issue = async ({ params }: IssuePageProps) => {
  const resolvedParams = await params;
  const slug: string = resolvedParams.id; // Issue Name + Issue ID
  const slugArray = slug.split("-");
  const issueId: number = Number(slugArray[slugArray.length - 1]);

  if (Number.isNaN(issueId)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    notFound();
  }


  return <>{issue && <ChangeIssue issueData={issue} />}</>;
};

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker project",
};

export default Issue;
