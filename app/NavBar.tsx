"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from 'react-icons/fa';
const NavBar = () => {
  const currentPath = usePathname();
  const routeLinks = [
    { pathname: "Dashboard", pathRoute: "/dash" },
    { pathname: "Issues", pathRoute: "/issues" },
  ]
  return <>
    <div className="bg-stone-700 flex gap-4 space-x- list-none 6 border-b mb-2 p-2 items-center">
      <li>
        <Link href='/'> <FaBug /> </Link>
      </li>
      {routeLinks.map((p) => <li className={currentPath == p.pathRoute ? "text-blue-400" : "text-zinc-300"}
        key={p.pathRoute}>
        <Link href={p.pathRoute} >
          {p.pathname}</Link> </li>)}
    </div>
  </>
}
export default NavBar;
