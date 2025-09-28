import { Button } from "@radix-ui/themes"
import Link from "next/link";
import ShowIssues from "../components/ShowIssues";
const Issues = async ({ searchParams }:
  { searchParams: { [key: string]: string | undefined | string[] } }

) => {
  const statusParam = searchParams.status
  console.log(searchParams.status)
  return <>
    <div className='mb-28 text-left'>
      <ShowIssues status={statusParam} />
      <Button>
        <Link href={'issues/new'}> new Issue</Link>
      </Button>
    </div>
  </>
}
export default Issues;
