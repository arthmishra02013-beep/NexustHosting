 "use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function Navbar() {
  const { currency, setCurrency, cart } = useCart();

  return (
    <>
      <header className="nav">
        <Link href="/" className="brand">
          <span className="brand-mark">N</span>
          <span>Nexus<span>Hosting</span></span>
        </Link>

        <nav className="links">
          <Link href="/">Home</Link>
          <Link href="/#plans">Minecraft</Link>
          <Link href="/#plans">Games</Link>
          <Link href="/#plans">Cloud</Link>
          <Link href="/#support">Company</Link>
        </nav>

        <div className="nav-actions">
          <button className="currency" onClick={() => setCurrency(currency === "NPR" ? "INR" : "NPR")}>
            {currency} <span>⌄</span>
          </button>
          <Link href="/login" className="client-btn">Client Area</Link>
          <Link href="/cart" className="cart-link">Cart {cart.length > 0 && <b>{cart.length}</b>}</Link>
        </div>
      </header>
      <div className="announcement">🎉 Affordable Minecraft hosting with AMD EPYC performance. <strong>No hidden fees.</strong></div>
    </>
  );
}