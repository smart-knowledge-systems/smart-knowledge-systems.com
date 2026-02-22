import { Bitter, JetBrains_Mono } from "next/font/google";
import { KnotPageClient } from "./knot-client";

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export default function KnotPage() {
  return (
    <div className={`${bitter.variable} ${jetbrainsMono.variable}`}>
      <KnotPageClient />
    </div>
  );
}
