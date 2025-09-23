type DataType = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string
}
const ShowIssues = async () => {
  const res = await fetch("http://localhost:3000/api/issues/")
  const data = await res.json()
  console.log(data)
  return <>
    <div className='text-white'>
      <div className="m-4 p-4 m-2border-2 rounded-2xl shadow-2xl shadow-[#3358D4] w-[50%] ">
        <table className="w-full text-center mx-auto border-separate border-spacing-y-1">
          <thead className="">
            <tr className=" text-left">
              <th className="p-3 rounded-l-lg">Title</th>
              <th className="p-3 rounded-r-lg">Status</th>
              <th className="p-3 ">Created</th>
            </tr>
            <tr className="h-2"></tr>
          </thead>
          <tbody>
            {data.map((i: DataType) => <>
              <tr key={i.id}
                className=" text-left  cursor-pointer h-12 ">
                <td className="border-2 border-[#2598F5] border-r-0 rounded-l-2xl indent-2">{i.title}</td>
                <td className="border-2 border-[#2598F5] border-x-0 rounded-x-2xl indent-2">{i.status}</td>
                <td className="border-2 border-[#2598F5] border-l-0 rounded-r-2xl indent-2">{i.createdAt}</td>
              </tr>
              <td className="h-1"></td>
            </>)}


          </tbody>
        </table>

      </div>

    </div>
  </>
}
export default ShowIssues;
