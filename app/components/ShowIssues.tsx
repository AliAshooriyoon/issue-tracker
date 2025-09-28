import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import prisma from "@/prisma/client";
import FilterIssue from "./filterIssue";

export type DataType = {
  title: string,
  id: number,
  description: string,
  slug: string | null,
  status: string,
  createdAt: Date | string,
  updatedAt: Date,
  userId: string,
}

const ShowIssues = async () => {

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin")
  }

  // const cookieStore = await cookies();
  // const cookieHeader = cookieStore
  //   .getAll()
  //   .map((c) => `${c.name}=${c.value}`)
  //   .join("; ");

  await fetch('/api/issues/create-slug', { method: 'PATCH' });
  const data = await prisma.issue.findMany({
    where: {
      userId: session?.user?.id
    },
    orderBy: {
      title: "desc"
    }
  })

  if (!data) {
    throw new Error("Connection failed!")
  }
  // const data = await res.json()
  // console.log(data)
  data.forEach((element: DataType) => {
    // console.log(convertDate)
    element.createdAt = new Date(element.createdAt).toLocaleDateString("en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  });
  return <>
    <FilterIssue />
    <div className='text-white'>
      <div className="m-4 p-4 m-2border-2 rounded-2xl shadow-2xl shadow-[#3358D4] min-w-[50%]">
        <table className="w-full text-center mx-auto border-separate border-spacing-y-1">
          <thead className="">
            <tr className=" text-left">
              <th className="p-3 rounded-l-lg">Title</th>
              <th className="p-3 rounded-r-lg">Status</th>
              <th className="p-3">Created</th>
            </tr>
            <tr className="h-2"></tr>
          </thead>
          <tbody>
            {data.map((i: DataType) => < Fragment key={i.id}>
              <tr
                className=" text-left w-full h-12 ">
                <td className="border-2 border-[#2598F5] border-r-0 rounded-l-2xl indent-2">
                  <span className="cursor-pointer inline ">
                    <Link href={`/issues/${i.slug}`}>{i.title}</Link>
                  </span>
                </td>
                <td className="border-2 border-[#2598F5] 
                 max-md:border-l-0 max-md:rounded-r-2xl max-md:border-r-2 border-x-0  rounded-x-2xl indent-2"> <div
                    className={`inline ${i.status == 'CLOSED' ? 'text-red-900 bg-red-300'
                      : i.status == "IN_PROGRESS" ? "text-yellow-900 bg-yellow-300" :
                        "text-green-900 bg-green-300"} rounded-xl px-2 py-1`}>
                    {i.status}</div> </td>
                <td className="hidden md:table-cell border-2 border-[#2598F5] 
                  border-l-0 rounded-r-2xl indent-2">
                  {`${i.createdAt}`}</td>
              </tr>
              <td className="h-1"></td>
            </Fragment>)}


          </tbody>
        </table>

      </div>

    </div>
  </>
}
export default ShowIssues;
