import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "../../../../../config";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    if (!token.backendTokens?.refreshToken) {
      throw new Error("No hay refresh token disponible.");
    }

    const res = await fetch(`${config.API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al refrescar el token");
    }

    const response = await res.json();

    console.log("Token refrescado");

    return {
      ...token,
      backendTokens: {
        ...response,
        expiresIn: Date.now() + response.expiresIn * 1000,
      },
    };
  } catch (error) {
    console.error("Error refrescando el token:", error);
    return { ...token, error: "RefreshTokenFailed" };
  }
}

export const authOptions: NextAuthOptions = {
  secret: config.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const res = await fetch(`${config.API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({ username: credentials.username, password: credentials.password }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return null;

        const user = await res.json();
        return {
          ...user,
          backendTokens: {
            ...user.backendTokens,
            expiresIn: Date.now() + user.backendTokens.expiresIn * 1000,
          },
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Si es un nuevo usuario autenticado, guardar tokens
      if (user) return { ...token, ...user };

      // Si el token ha expirado, refrescarlo
      if (Date.now() > token.backendTokens.expiresIn) {
        return await refreshToken(token);
      }

      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
