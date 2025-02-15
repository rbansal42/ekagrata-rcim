export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Ekagrata",
  description:
    "Discover unique artisan products at Ekagrata - A project promoting local artisans and their craftsmanship.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Products",
      href: "/products",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  links: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  },
};
