import type { Metadata } from "next/types";

import { SiteHeader } from "@acme/ui/components/side-header";

import { siteConfig } from "~/config/site";

export const metadata: Metadata = {
  title: "Admin",
  description: "Simple monorepo with shared backend for web & mobile apps",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader name={siteConfig.name} items={siteConfig.mainNav} />
      {props.children}
    </>
  );
}
