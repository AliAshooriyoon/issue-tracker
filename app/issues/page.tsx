import { Button } from "@radix-ui/themes"
import Link from "next/link";
const Issues = () => {
  return <>
    <div className='bg-stone-800'>

      <Button>
        <Link href={'issues/new'}> new Issue</Link>
      </Button>
    </div>
  </>
}
export default Issues;
