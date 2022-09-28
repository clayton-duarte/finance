import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),
  ],
  // Type '(url: any, baseUrl: any) => Promise<any>' is not assignable to type
  // '(params: { url: string; baseUrl: string; }) => Awaitable<string>'
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
