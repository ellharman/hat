import "../styles/globals.css";

import { AppProps } from "next/app";
import Layout from "../components/Layout";

interface CustomComponentProps {
  alignCenter?: boolean;
}

interface CustomAppProps extends AppProps {
  Component: AppProps['Component'] & CustomComponentProps;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      <Layout alignCenter={Component.alignCenter}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
