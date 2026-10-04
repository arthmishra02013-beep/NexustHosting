 "use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) return;
    localStorage.setItem("nexus-user","true");
    localStorage.setItem("nexus-email",email);
    localStorage.setItem("nexus-name",name);
    router.push(next);
  }

  return <main className="auth-page"><div className="auth-card">
    <div className="auth-logo">N</div>
    <h1>Create your account</h1>
    <p>Join NexusHosting and manage your servers.</p>
    <form onSubmit={submit}>
      <label>Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" /></label>
      <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" type="email" /></label>
      <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password" type="password" /></label>
      <button className="primary-btn" type="submit">Create account</button>
    </form>
    <p className="auth-bottom">Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link></p>
  </div></main>
}