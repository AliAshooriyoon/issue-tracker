"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FilterIssue = () => {
  const [selectValue, setSelectValue] = useState('')
  const router = useRouter();

  const changeStatus = (inp: string) => {
    setSelectValue(inp)
    router.push(`/issues${inp ? `?status=${inp}` : ''}`);
  };

  return <>
    <div className="text-white pt-12 pl-6">
      <select value={selectValue} onChange={(e) => changeStatus(e.target.value)}
        className="border-2 p-2 rounded-2xl w-32">
        <option value={'open'} >Open</option>
        <option value={'inProgress'}>InProgress</option>
        <option value={'closed'}>Closed</option>
        <option value={''} selected>All</option>
      </select>
    </div>
  </>
}
export default FilterIssue;
