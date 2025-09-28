// app/issues/[id]/page.tsx
import { ChangeIssue } from "@/app/components/ChangeIssue";
import { DataType } from "@/app/components/ShowIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Next.js PageProps generisch typisieren
type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Issue = async ({ params }: PageProps) => {
  // Kein await hier!
  const slug = params.id; // z.B. "login-bug-12"
  const slugArray = slug.split("-");
  const issueId = Number(slugArray.at(-1));

  // API Call
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/issues`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Connection failed!");
  const data: DataType[] = await res.json();

  // Validierung
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
