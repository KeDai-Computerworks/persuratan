"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@acme/ui/components/ui/button";

export function AuthShowcase() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button variant={"destructive"} onClick={() => void signIn()}>
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <Button onClick={() => void signOut()}>Sign out</Button>
    </div>
  );
}
