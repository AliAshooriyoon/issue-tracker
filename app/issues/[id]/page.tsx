// app/issues/[id]/page.tsx
import { ChangeIssue } from "@/app/components/ChangeIssue";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IssuePage = async ({ params }: any) => {
  const slug = params.id;

  // Extract issue ID from slug
  const slugArray = slug.split("-");
  const issueId = Number(slugArray.at(-1));

  // Fetch the issue directly from the database
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  // If issue not found or slug mismatch, return 404
  if (!issue || issue.slug !== slug) {
    notFound();
  }

  return <ChangeIssue issueData={issue} />;
};

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "View an issue",
};

export default IssuePage;
