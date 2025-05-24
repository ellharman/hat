import React from "react";
import Head from "next/head";

const Custom404: React.FC & { alignCenter?: boolean } = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Datura Astrobotanics</title>
        <meta
          name="description"
          content="The page you're looking for could not be found."
        />
      </Head>

      <div className="h-1/2 bg-secondary flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-contrast mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-contrast mb-6">
            Page Not Found
          </h2>
          <p className="text-contrast/80 mb-8">
            The celestial path you seek has wandered beyond our reach. Perhaps
            the stars have other plans for your journey.
          </p>
          <a
            href="/"
            className="inline-block bg-secondary text-contrast px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors font-medium"
          >
            Return Home
          </a>
        </div>
      </div>
    </>
  );
};

Custom404.alignCenter = true;

export default Custom404;
