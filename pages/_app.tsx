import BlogPost from "../components/BlogPost";
import "../styles/globals.css";

const components = {
  blogPost: BlogPost
};

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
