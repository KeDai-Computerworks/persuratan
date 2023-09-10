import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@acme/db";

import { env } from "./env.mjs";

export type { Session } from "next-auth";
export { AuhtProvider } from "./providers/session-provider";

// Update this whenever adding new providers so that the client can
export const providers = ["google"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),

    signIn: () => {
      return true;
    },

    // // @TODO - if you wanna have auth on the edge
    // jwt: ({ token, profile }) => {
    //   if (profile?.id) {
    //     token.id = profile.id;
    //     token.image = profile.picture;
    //   }
    //   return token;
    // },

    // // @TODO
    // authorized({ auth }) {
    //   console.log({ auth });

    //   return !!auth?.user;
    // },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const handler = NextAuth(authOptions);

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};

// export const getServerSessions = () => getServerSession()
