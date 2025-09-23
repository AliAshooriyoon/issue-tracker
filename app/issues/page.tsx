
import { Button } from "@radix-ui/themes"
import Link from "next/link";
import ShowIssues from "../components/ShowIssues";
const Issues = () => {

  return <>
    <div className=''>
      <ShowIssues />
      <Button>
        <Link href={'issues/new'}> new Issue</Link>
      </Button>
    </div>
  </>
}
export default Issues;
