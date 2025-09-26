"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from 'react-icons/fa';
import { useSession } from "next-auth/react"
const NavBar = () => {
  const { data, status } = useSession();
  const currentPath = usePathname();
  const routeLinks = [
    { pathname: "Dashboard", pathRoute: "/dash" },
    { pathname: "Issues", pathRoute: "/issues" },
  ]

  return <>
    <div className="px-4 bg-stone-700 flex justify-between gap-4  space-x- list-none 6 border-b mb-2 p-2 items-center">
      <div className="flex items-center gap-4">
        <li>
          <Link href='/'> <FaBug /> </Link>
        </li>
        {routeLinks.map((p) => <li className={currentPath == p.pathRoute ? "text-blue-400" : "text-zinc-300"}
          key={p.pathRoute}>
          <Link href={p.pathRoute} >
            {p.pathname}</Link> </li>)}
      </div>
      <div className="text-white cursor-pointer pr-12 text-xl">
        <Link href={status == "unauthenticated" ? '/api/auth/signin' : status == "authenticated" ?
          "/api/auth/signout" : "#"}>
          {status == "authenticated" ? "Signout" : status == "unauthenticated" ? "Signin" : ""}</Link>
      </div>
    </div>
  </>
}
export default NavBar;
