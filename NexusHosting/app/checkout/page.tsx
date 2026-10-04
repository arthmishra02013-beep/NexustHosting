 "use client";

import Link from "next/link";
import { useCart } from "../components/CartProvider";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart, currency } = useCart();
  const [logged, setLogged] = useState(false);
  const symbol = currency === "NPR" ? "NPR" : "₹";
  const total = cart.reduce((a, p) => a + p.price, 0);

  useEffect(() => {
    setLogged(localStorage.getItem("nexus-user") === "true");
  }, []);

  if (!logged) return (
    <main className="center-page">
      <div className="auth-card">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Sign in to continue</h1>
        <p>You need to sign in to your NexusHosting Client Area before checking out.</p>
        <Link href="/login?next=/checkout" className="primary-btn">Sign In</Link>
        <Link href="/signup?next=/checkout" className="text-link">Don't have an account? Sign up</Link>
      </div>
    </main>
  );

  if (cart.length === 0) return (
    <main className="center-page">
      <div className="auth-card">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Your cart is empty</h1>
        <p>Choose a Minecraft hosting plan before continuing.</p>
        <Link href="/#plans" className="primary-btn">Browse Plans</Link>
      </div>
    </main>
  );

  return (
    <main className="payment-page">
      <div className="payment-head">
        <Link href="/cart" className="back-link">← Back to cart</Link>
        <p className="eyebrow">NEXUSHOSTING CHECKOUT</p>
        <h1>Complete Your Order</h1>
        <p>Pay using the QR below, then create a ticket in our Discord server and send your payment screenshot.</p>
      </div>

      <div className="payment-grid">
        <section className="order-summary">
          <div className="section-label">ORDER SUMMARY</div>
          {cart.map(plan => (
            <div className="summary-product" key={plan.slug}>
              <img src={plan.icon} alt="" />
              <div className="summary-info">
                <h2>{plan.name}</h2>
                <p>{plan.ram} RAM · {plan.cpu} CPU · {plan.storage}</p>
                <p>AMD EPYC · DDR4 3200 MT/s</p>
              </div>
              <strong>{symbol} {plan.price}/mo</strong>
            </div>
          ))}
          <div className="totals">
            <div><span>Subtotal</span><strong>{symbol} {total}</strong></div>
            <div><span>Discount</span><strong>—</strong></div>
            <div className="total-row"><span>Total</span><strong>{symbol} {total}</strong></div>
          </div>
        </section>

        <section className="payment-card">
          <div className="pay-title">
            <div>
              <p className="eyebrow">PAYMENT</p>
              <h2>Pay on this QR</h2>
            </div>
            <span className="esewa-label">eSewa</span>
          </div>

          <div className="qr-wrap">
            <img src="/images/esewa-payment.png" alt="NexusHosting eSewa payment QR code" />
          </div>

          <div className="payment-instruction">
            <div className="instruction-icon">◆</div>
            <div>
              <h3>CREATE A TICKET ON OUR DISCORD SERVER</h3>
              <p>After paying, send a clear screenshot of your payment inside your ticket.</p>
            </div>
          </div>

          <a
            href="https://discord.gg/NgHw5ZbRM"
            target="_blank"
            rel="noreferrer"
            className="discord-payment-btn"
          >
            <span className="discord-symbol">◉</span>
            Join Discord & Create a Ticket →
          </a>

          <p className="payment-note">
            Your order will be reviewed after the payment screenshot is submitted.
          </p>
        </section>
      </div>
    </main>
  );
}