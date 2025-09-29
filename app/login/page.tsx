
"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (!res?.error) router.push("/dashboard")
    else alert("Invalid credentials")
  }

  return (
    <div className="flex flex-col gap-4 text-white max-w-sm mx-auto">
      {/* GitHub Login */}
      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        className="bg-gray-800 text-white p-2 rounded"
      >
        Login with GitHub
      </button>

      {/* Credentials Login */}
      <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login with Email
        </button>
      </form>
      <p>Have no account? <Link href={'/register'}>Create Account!</Link>
      </p>
    </div>
  )
}
