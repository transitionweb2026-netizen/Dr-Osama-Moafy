import { Anton, Inter, Dancing_Script, Cairo } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-dancing-script",
  display: "swap",
});

// Arabic locale uses Cairo (a professional, medically-appropriate Modern
// Standard Arabic typeface) for both headlines and body copy, since Anton
// has no Arabic glyphs at all.
export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});
