import React, { FunctionComponent, useEffect } from "react";
import { Provider as AuthProvider } from "next-auth/client";
import { AppProps } from "next/app";
import Error from "next/error";

import ThemeProvider, { GlobalStyle } from "../providers/theme";
import CurrencyProvider from "../providers/currency";
import ProfileProvider from "../providers/profile";
import { PageProps, SuccessProps } from "../libs/withSSP";

interface SSRAppProps extends AppProps<SuccessProps> {
  pageProps: PageProps;
}

const MyApp: FunctionComponent<SSRAppProps> = ({
  Component: Page,
  pageProps,
  router,
}) => {
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
    <AuthProvider session={pageProps.session}>
      <CurrencyProvider>
        <ThemeProvider>
          <ProfileProvider>
            <Page {...pageProps} key={router.route} />
          </ProfileProvider>
          <GlobalStyle />
        </ThemeProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
};

export default MyApp;
