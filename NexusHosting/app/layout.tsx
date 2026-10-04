import "./globals.css";
import { CartProvider } from "./components/CartProvider";
import { Navbar } from "./components/Navbar";

export const metadata = {
  title: "NexusHosting | Minecraft Hosting",
  description: "Affordable Minecraft hosting powered by AMD EPYC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}