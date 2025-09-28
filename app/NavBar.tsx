"use client"
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from 'react-icons/fa';
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useState } from "react";
const MenuUser = ({ status }: { status: string }) => {
  return <div className="absolute top-16 right-4 text-white w-48 p-2 text-left indent-2 text-xl h-32 bg-stone-600 rounded-b-2xl z-20">
    <Link href={status == "unauthenticated" ? '/api/auth/signin' : status == "authenticated" ?
      "/api/auth/signout" : "#"}>
      {status == "authenticated" ? "Signout" : status == "unauthenticated" ? "Signin" : ""}</Link>
  </div>
}
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { data: session, status } = useSession();
  console.log(session?.user?.id)
  const currentPath = usePathname();
  const routeLinks = [
    { pathname: "Dashboard", pathRoute: "/dashboard" },
    { pathname: "Issues", pathRoute: "/issues" },
  ]

  return <>
    <div className="relative">
      {showMenu && (<div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />)}
      <div className=" w-full px-4 bg-stone-700 flex justify-between gap-4
      space-x- list-none 6 border-b mb-2 p-2 items-center h-16">

        {showMenu && <MenuUser status={status} />}
        <div className="flex items-center gap-4">
          <li>
            <Link href='/'> <FaBug /> </Link>
          </li>
          {routeLinks.map((p) => <li className={currentPath == p.pathRoute ? "text-blue-400" : "text-zinc-300"}
            key={p.pathRoute}>
            <Link href={p.pathRoute} >
              {p.pathname}</Link> </li>)}
        </div>
        <div className="text-white h-full cursor-pointer pr-12 text-xl flex gap-6 flex-row-reverse items-center">
          <div className=''>


            <Image onClick={() => setShowMenu(prev => !prev)} alt="" width={50} height={50}
              className={`${session?.user?.id && 'rounded-full border-2 border-white'} `}
              src={`${session?.user?.image ?? 'https://img.icons8.com/forma-thin-filled/24/user.png'}`}>
            </Image>
          </div>
        </div>
      </div>


    </div>
  </>
}
export default NavBar;
