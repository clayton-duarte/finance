import React from "react";

import Providers from "../src/providers";

const MyApp = ({ Component: Page, pageProps, router }) => {
  return (
    <Providers>
      <Page {...pageProps} key={router.route} />
    </Providers>
  );
};

export default MyApp;
