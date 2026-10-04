"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) return;

    localStorage.setItem("nexus-user", "true");
    localStorage.setItem("nexus-email", email);

    router.push(next);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">N</div>

        <h1>Sign in to your account</h1>
        <p>Access your NexusHosting Client Area.</p>

        <form onSubmit={submit}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              type="email"
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              type="password"
            />
          </label>

          <div className="remember">
            <label>
              <input type="checkbox" /> Remember me
            </label>

            <a href="#">Forgot your password?</a>
          </div>

          <button className="primary-btn" type="submit">
            Sign in
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account?{" "}
          <Link href={`/signup?next=${encodeURIComponent(next)}`}>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<main className="auth-page" />}>
      <LoginForm />
    </Suspense>
  );
}