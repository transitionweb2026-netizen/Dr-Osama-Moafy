export const siteConfig = {
  name: "NeuroPrecision",
  doctorName: "Dr. Osama Mowafy",
  tagline: "Precision Beyond Perception",
  url: "https://www.neuroprecision.example",
  phone: "+20 2 1234 5678",
  whatsapp: "+20 100 234 5678",
  whatsappNumber: "201002345678",
  email: "care@osamamowafy.com",
  addressLine: "Medical District East, Tower B, 4th Floor, Suite 402, New Cairo, Egypt",
  hours: "Sat - Wed: 10:00 AM - 08:00 PM",
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "videos", href: "/videos" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export const socialLinks = [
  { key: "facebook", href: "#" },
  { key: "linkedin", href: "#" },
  { key: "youtube", href: "#" },
] as const;
