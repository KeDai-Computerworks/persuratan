import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@acme/ui/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "@acme/api";
import { AuhtProvider, getServerAuthSession } from "@acme/auth";
import { cn } from "@acme/tailwind-config/lib/utils";
import { ThemeProvider } from "@acme/ui/providers/theme-provider";

import { siteConfig } from "~/config/site";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          ["font-sans", fontSans.variable].join(" "),
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuhtProvider session={session}>
            <TRPCReactProvider headers={headers()}>
              {props.children}
            </TRPCReactProvider>
          </AuhtProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
