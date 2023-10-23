export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Persuratan Kedai",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Surat",
      href: "/surat",
    },
    {
      title: "Anggota",
      href: "/anggota",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
