 "use client";

import Link from "next/link";
import { useCart } from "../components/CartProvider";

export default function CartPage() {
  const { cart, currency, removeFromCart } = useCart();
  const symbol = currency === "NPR" ? "NPR" : "₹";

  return (
    <main className="simple-page">
      <div className="page-head"><p className="eyebrow">NEXUSHOSTING</p><h1>Your Cart</h1><p>Review the server you want to order.</p></div>
      {cart.length === 0 ? (
        <div className="empty-box"><h2>Your cart is empty</h2><Link href="/#plans" className="primary-btn">Browse Plans</Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(plan => (
              <div className="cart-item" key={plan.slug}>
                <img src={plan.icon} alt="" />
                <div><h2>{plan.name}</h2><p>{plan.ram} RAM · {plan.cpu} CPU · {plan.storage}</p></div>
                <strong>{symbol} {plan.price}/mo</strong>
                <button onClick={() => removeFromCart(plan.slug)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="checkout-box">
            <p>Total</p><h2>{symbol} {cart.reduce((a,p)=>a+p.price,0)}<small>/month</small></h2>
            <Link href="/checkout" className="primary-btn">Checkout →</Link>
          </div>
        </div>
      )}
    </main>
  );
}