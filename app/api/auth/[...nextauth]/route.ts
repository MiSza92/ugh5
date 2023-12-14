import connectMongo from "@/app/config/mongo";
import User from "@/app/schemas/user";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;
        try {
          connectMongo();
          const user = await User.findOne({ email });
          if (password != user.password) {
            console.log("password checken :>> ", password);
          } else {
            return user;
          }
        } catch (error) {
          console.log("error :>> ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60,
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
