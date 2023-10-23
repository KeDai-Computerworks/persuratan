import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@acme/ui/styles/globals.css";

import { headers } from "next/headers";

import { getServerAuthSession } from "@acme/auth";

import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "./providers/session-provider";
import { ThemeProvider } from "./providers/theme-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
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
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            <TRPCReactProvider headers={headers()}>
              {props.children}
            </TRPCReactProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
