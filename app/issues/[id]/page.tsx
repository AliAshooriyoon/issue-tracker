const Issue = ({ params }: { params: { id: string } }) => {
  const issueId = params.id;  // Issue Name + Issue ID;
  return <>
    <div className='text-white'>Issue
    </div>
  </>
}
export default Issue;
