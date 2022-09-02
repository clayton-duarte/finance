import React, { FunctionComponent, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Error from "next/error";

import ThemeProvider, { GlobalStyle } from "../providers/theme";
import { PageProps, SuccessProps } from "../libs/withSSP";
import CurrencyProvider from "../providers/currency";
import ProfileProvider from "../providers/profile";

interface SSRAppProps extends AppProps<SuccessProps> {
  pageProps: PageProps;
}

const MyApp: FunctionComponent<SSRAppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const Page = Component;
  useEffect(() => {
    // CLEAN AS PATH
    if (router.asPath.includes("#")) {
      const newPath = router.asPath.replace("#", "");
      router.replace(router.route, newPath);
    }
  }, [router, router.asPath]);

  if (pageProps.success === false) {
    return <Error {...pageProps.error} />;
  }

  return (
    <SessionProvider session={pageProps.session}>
      <CurrencyProvider>
        <ThemeProvider>
          <ProfileProvider>
            <Page {...pageProps} key={router.route} />
          </ProfileProvider>
          <GlobalStyle />
        </ThemeProvider>
      </CurrencyProvider>
    </SessionProvider>
  );
};

export default MyApp;
