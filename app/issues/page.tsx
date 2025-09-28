"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import FilterIssue from "../components/filterIssue";
import { Button } from "@radix-ui/themes";

export type DataType = {
  title: string;
  id: number;
  description: string;
  slug: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export default function IssuesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [issues, setIssues] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) router.push("/api/auth/signin");
  }, [session, status, router]);

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchIssues = async () => {
      try {
        const res = await fetch("/api/issues");
        if (!res.ok) throw new Error("Failed to fetch issues");
        const data = await res.json();
        setIssues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [session?.user?.id]);

  if (status === "loading" || loading) return <div>Loading...</div>;

  return (
    <div className="mb-28 text-left">
      <FilterIssue />
      <div className="text-white">
        <div className="m-4 p-4 rounded-2xl shadow-2xl shadow-[#3358D4] min-w-[50%]">
          <table className="w-full text-center border-separate border-spacing-y-1">
            <thead>
              <tr className="text-left">
                <th className="p-3 rounded-l-lg">Title</th>
                <th className="p-3 rounded-r-lg">Status</th>
                <th className="p-3">Created</th>
              </tr>
              <tr className="h-2"></tr>
            </thead>
            <tbody>
              {issues.map((i) => (
                <tr key={i.id} className="text-left w-full h-12">
                  <td className="border-2 border-[#2598F5] border-r-0 rounded-l-2xl indent-2">
                    <Link href={`/issues/${i.slug}`}>{i.title}</Link>
                  </td>
                  <td className="border-2 border-[#2598F5] rounded-x-2xl indent-2">
                    <div
                      className={`inline ${i.status === "CLOSED"
                          ? "text-red-900 bg-red-300"
                          : i.status === "IN_PROGRESS"
                            ? "text-yellow-900 bg-yellow-300"
                            : "text-green-900 bg-green-300"
                        } rounded-xl px-2 py-1`}
                    >
                      {i.status}
                    </div>
                  </td>
                  <td className="hidden md:table-cell border-2 border-[#2598F5] border-l-0 rounded-r-2xl indent-2">
                    {new Date(i.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
