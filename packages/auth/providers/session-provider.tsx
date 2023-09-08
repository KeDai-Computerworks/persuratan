"use client";

import * as React from "react";
import type { SessionProviderProps } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

export function AuhtProvider(props: SessionProviderProps) {
  return <SessionProvider {...props} />;
}
