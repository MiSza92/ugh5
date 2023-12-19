import connectMongo from "@/app/config/mongo";
import User from "@/app/schemas/user";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
//import { CredentialsProvider } from "next-auth/providers";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        try {
          connectMongo();
          const user = await User.findOne({ email });
          if (password !== user.password) {
            console.log("password checken :>> ", password);
            return null; // Rückgabewert für ungültige Anmeldeinformationen
          } else {
            return {
              id: user._id, // Hier die Benutzer-ID
              name: user.name,
              email: user.email,
              image: user.image,
            };
            console.log("id :>> ", user._id);
          }
        } catch (error) {
          console.log("error :>> ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60,
  },

  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
