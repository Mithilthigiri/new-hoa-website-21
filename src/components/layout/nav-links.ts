export type NavLink = {
  label: string;
  to: string;
  accent?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Collections", to: "/collections" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "New In", to: "/shop", accent: true },
  { label: "About", to: "/about" },
];

export const SECONDARY_LINKS: NavLink[] = [
  { label: "Shop All", to: "/shop" },
  { label: "Contact", to: "/contact" },
  { label: "Cart", to: "/cart" },
];

export const FOOTER_SHOP_LINKS: NavLink[] = [
  { label: "New In", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Shop All", to: "/shop" },
];

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { label: "Contact", to: "/contact" },
  { label: "Shipping", to: "/contact" },
  { label: "Returns", to: "/contact" },
  { label: "Size Guide", to: "/contact" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", to: "/contact" },
  { label: "Terms of Service", to: "/contact" },
];
