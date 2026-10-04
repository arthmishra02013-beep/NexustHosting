 "use client";

import Link from "next/link";
import { plans, useCart } from "./components/CartProvider";

export default function Home() {
  const { currency } = useCart();

  return (
    <main>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="pill">● Budget Minecraft Hosting</div>
          <h1>Affordable <span>Minecraft</span><br />Servers</h1>
          <p>Powerful Minecraft servers without breaking the bank. Built for communities, SMPs and players who want reliable performance.</p>
          <div className="hero-buttons">
            <a href="#plans" className="primary-btn">View Plans →</a>
            <Link href="/login" className="secondary-btn">Client Area</Link>
          </div>
        </div>
      </section>

      <section className="processor">
        <p className="eyebrow">POWERED BY</p>
        <h2>AMD EPYC</h2>
        <p>High-performance CPUs for smooth Minecraft gameplay.</p>
      </section>

      <section id="plans" className="plans-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MINECRAFT HOSTING</p>
            <h2>Choose Your Plan</h2>
            <p>Simple pricing. Powerful hardware. No confusing CPU options.</p>
          </div>
          <div className="currency-note">Prices shown in <strong>{currency}</strong></div>
        </div>

        <div className="plans-grid">
          {plans.map((plan, index) => (
            <article className={`plan-card ${index === 1 ? "popular" : ""}`} key={plan.slug}>
              {index === 1 && <div className="popular-badge">Most Popular</div>}
              <div className="plan-title">
                <img src={plan.icon} alt="" />
                <h3>{plan.name}</h3>
              </div>
              <div className="price"><span>{currency === "NPR" ? "NPR" : "₹"}</span> {plan.price}<small>/mo</small></div>
              <div className="specs">
                <div><span>▣ RAM</span><strong>{plan.ram} <em>DDR4 3200 MT/s</em></strong></div>
                <div><span>◉ CPU</span><strong>{plan.cpu} <em>AMD EPYC</em></strong></div>
                <div><span>▤ Storage</span><strong>{plan.storage}</strong></div>
                <div><span>⌖ Location</span><strong>India</strong></div>
                <div><span>◌ Backups</span><strong>Included</strong></div>
                <div><span>♢ DDoS Shield</span><strong className="green">Yes</strong></div>
              </div>
              <ul className="features">
                <li>✓ Instant Setup</li>
                <li>✓ All Minecraft Versions</li>
                <li>✓ 24/7 Support</li>
                <li>✓ Plugin Installer</li>
              </ul>
              <Link href={`/plan/${plan.slug}`} className="order-btn">Order Now — {currency === "NPR" ? "NPR" : "₹"}{plan.price} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="support" className="support">
        <div>
          <p className="eyebrow">NEED HELP?</p>
          <h2>Our support team is here.</h2>
          <p>Join the NexusHosting Discord for support, announcements and help with your server.</p>
        </div>
        <a href="https://discord.gg/NgHw5ZbRM" target="_blank" className="discord-btn">Join Discord →</a>
      </section>

      <footer>
        <div className="brand">Nexus<span>Hosting</span></div>
        <div><Link href="/">Home</Link><Link href="#support">Support</Link><Link href="/login">Client Area</Link></div>
        <small>© 2026 NexusHosting. All rights reserved.</small>
      </footer>
    </main>
  );
}