 "use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { plans, useCart } from "../../components/CartProvider";

export default function PlanPage() {
  const { slug } = useParams<{slug: string}>();
  const { currency, addToCart } = useCart();
  const plan = plans.find(p => p.slug === slug);

  if (!plan) return <main className="center-page"><h1>Plan not found</h1><Link href="/">Back home</Link></main>;

  const symbol = currency === "NPR" ? "NPR" : "₹";

  return (
    <main className="product-page">
      <div className="product-card">
        <div className="product-left">
          <span className="stock">● In stock</span>
          <div className="big-plan-title"><img src={plan.icon} alt="" /><h1>{plan.name}</h1></div>
          <div className="big-price">{symbol} {plan.price}<small>/month</small></div>
          <p>RAM: <strong>{plan.ram}</strong></p>
          <p>CPU: <strong>{plan.cpu}</strong> — AMD EPYC</p>
          <p>Storage: <strong>{plan.storage}</strong></p>
          <p>RAM Speed: <strong>DDR4 3200 MT/s</strong></p>
          <p>DDoS Shield: <strong className="green">Yes</strong></p>
          <div className="product-actions">
            <button className="primary-btn" onClick={() => addToCart(plan)}>Add to cart</button>
            <Link className="secondary-btn" href="/cart">View cart</Link>
          </div>
        </div>
      </div>
    </main>
  );
}