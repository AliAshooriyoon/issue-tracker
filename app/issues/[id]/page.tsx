// app/issues/[id]/page.tsx
import { ChangeIssue } from "@/app/components/ChangeIssue";
import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// nicht PageProps von Next.js verwenden → selber definieren
type IssuePageProps = {
  params: { id: string };
};

const Issue = async ({ params }: IssuePageProps) => {
  const slug = params.id;
  const slugArray = slug.split("-");
  const issueId = Number(slugArray.at(-1));

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/issues`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Connection failed!");
  const data: DataType[] = await res.json();

  const valid = data.find((e) => e.slug === slug);
  if (!valid) notFound();

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });

  return <>{issue && <ChangeIssue issueData={issue} />}</>;
};

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker project",
};

export default Issue;
