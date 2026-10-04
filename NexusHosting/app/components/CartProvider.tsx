 "use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Plan = {
  slug: string;
  name: string;
  icon: string;
  ram: string;
  cpu: string;
  storage: string;
  price: number;
};

export const plans: Plan[] = [
  { slug:"stone", name:"Stone Plan", icon:"https://cdn.discordapp.com/emojis/1548510262615736350.webp?size=44", ram:"4GB", cpu:"200%", storage:"16GB NVMe SSD", price:350 },
  { slug:"coal", name:"Coal Plan", icon:"https://cdn.discordapp.com/emojis/1548510005534130286.webp?size=44", ram:"6GB", cpu:"250%", storage:"30GB NVMe SSD", price:450 },
  { slug:"iron", name:"Iron Plan", icon:"https://cdn.discordapp.com/emojis/1287393886398058629.webp?size=44", ram:"8GB", cpu:"300%", storage:"38GB NVMe SSD", price:550 },
  { slug:"gold", name:"Gold Plan", icon:"https://cdn.discordapp.com/emojis/1287393921437007974.webp?size=44", ram:"10GB", cpu:"350%", storage:"45GB NVMe SSD", price:650 },
  { slug:"emerald", name:"Emerald Plan", icon:"https://cdn.discordapp.com/emojis/1373219586631008306.webp?size=44", ram:"12GB", cpu:"400%", storage:"60GB NVMe SSD", price:750 },
  { slug:"diamond", name:"Diamond Plan", icon:"https://cdn.discordapp.com/emojis/1555255676014432318.webp?size=44&animated=true", ram:"16GB", cpu:"500%", storage:"80GB NVMe SSD", price:950 },
  { slug:"netherite", name:"Netherite Plan", icon:"https://cdn.discordapp.com/emojis/1522984286049927189.webp?size=44", ram:"32GB", cpu:"800%", storage:"160GB NVMe SSD", price:1750 }
];

type CartContextType = {
  currency: "NPR" | "INR";
  setCurrency: (c: "NPR" | "INR") => void;
  cart: Plan[];
  addToCart: (plan: Plan) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<"NPR" | "INR">("NPR");
  const [cart, setCart] = useState<Plan[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexus-cart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("nexus-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(plan: Plan) {
    setCart((current) => current.some(p => p.slug === plan.slug) ? current : [...current, plan]);
  }

  function removeFromCart(slug: string) {
    setCart(current => current.filter(p => p.slug !== slug));
  }

  return (
    <CartContext.Provider value={{ currency, setCurrency, cart, addToCart, removeFromCart, clearCart: () => setCart([]) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}