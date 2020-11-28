import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    Providers.Google({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),
  ],
  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(baseUrl);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
