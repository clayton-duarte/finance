import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  secret: process.env.SESSION_PASSWORD,
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return NextAuth(req, res, options);
}

export default handler;
