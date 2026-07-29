export interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Home", href: "/admin/home", icon: "home" },
  { label: "Dr. Osama Moafy", href: "/admin/doctor", icon: "person" },
  { label: "Services", href: "/admin/services", icon: "medical_services" },
  { label: "Videos", href: "/admin/videos", icon: "smart_display" },
  { label: "Articles", href: "/admin/articles", icon: "article" },
  { label: "Contact", href: "/admin/contact", icon: "call" },
  { label: "Navbar", href: "/admin/navbar", icon: "menu" },
  { label: "Footer", href: "/admin/footer", icon: "vertical_align_bottom" },
  { label: "Global Settings", href: "/admin/settings", icon: "settings" },
  { label: "SEO", href: "/admin/seo", icon: "travel_explore" },
  { label: "Media Library", href: "/admin/media", icon: "perm_media" },
];
