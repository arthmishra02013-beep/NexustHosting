"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    localStorage.setItem("nexus-user", "true");
    localStorage.setItem("nexus-email", email);
    localStorage.setItem("nexus-name", name);

    router.push(next);
  }

  const loginUrl = "/login?next=" + encodeURIComponent(next);

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">N</div>

        <h1>Create your account</h1>
        <p>Join NexusHosting and manage your servers.</p>

        <form onSubmit={submit}>
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              type="email"
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              type="password"
            />
          </label>

          <button className="primary-btn" type="submit">
            Create account
          </button>
        </form>

        <p className="auth-bottom">
          Already have an account?{" "}
          <Link href={loginUrl}>Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default function Signup() {
  return (
    <Suspense fallback={<main className="auth-page" />}>
      <SignupForm />
    </Suspense>
  );
}