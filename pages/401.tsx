import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Error from "next/error";

import { useMagic } from "../src/providers/magic";

const ErrorPage: NextPage = () => {
  const { logout } = useMagic();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      logout();
      router.push("/");
    }, 3000);
    return logout;
  }, []);

  return <Error statusCode={401} title="Email not authorized" />;
};

export default ErrorPage;
