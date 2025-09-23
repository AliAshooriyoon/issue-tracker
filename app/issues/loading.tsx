"use client"

import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const LoadingIssues = () => {
  const exampleData = Array.from({ length: 20 })

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="">
      <table className=" w-full text-center mx-auto border-separate border-spacing-y-1">
        <thead>
          <tr className="text-left">
            <th className="p-3 rounded-l-lg">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3 rounded-r-lg">Created</th>
          </tr>
        </thead>
        <tbody>
          {exampleData.map((_, i) => (
            <tr
              key={i}
              className="text-left w-full cursor-pointer h-12 "
            >
              {/* <td className="border-2 border-[#2598F5] border-r-0 rounded-l-2xl indent-2"> */}
              {/*   <Skeleton /> */}
              {/* </td> */}
              {/* <td className="border-2 border-[#2598F5] max-md:border-l-0 max-md:rounded-r-2xl max-md:border-r-2 border-x-0 rounded-x-2xl indent-2"> */}
              {/*   <Skeleton /> */}
              {/* </td> */}
              <td className="w-full  table-cell border-2 border-[#2598F5] border-l-0 rounded-r-2xl indent-2">
                <Skeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  )
}
export default LoadingIssues
