import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Cognito({
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      clientId: process.env.COGNITO_CLIENT_ID,
      domain: process.env.COGNITO_DOMAIN,
    }),
  ],
  // debug: true,
  callback: {
    redirect: async (url, baseUrl) => {
      console.log("redirect", url, baseUrl);
      return Promise.resolve(baseUrl);
    },
  },
  events: {
    signIn: async (message) => {
      console.log("signIn", message);
    },
    signOut: async (message) => {
      console.log("signOut", message);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
