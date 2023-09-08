export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Persuratan Kedai",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "SP",
      href: "/",
    },
    {
      title: "Reshuffle",
      href: "/reshuffle",
    },
    {
      title: "Pemecatan",
      href: "/pemecatan",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
