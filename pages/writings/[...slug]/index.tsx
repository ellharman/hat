export const runtime = "experimental-edge";

import React from "react";
import fetchSB, { StoryVersion } from "../../api/storyblok-fetch";
import BlogPost from "../../../components/BlogPost";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params || {};
  const res = await fetchSB("/stories", StoryVersion.DRAFT, `writings/${slug}`);
  const { stories = [] } = await res.json();

  return {
    props: {
      story: stories[0] || null,
    },
    revalidate: 30, // Revalidate every minute
  };
};
export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

interface WritingPageProps {
  story: any;
}

const Writing: React.FC<WritingPageProps> = ({ story }) => {
  return <>{story ? <BlogPost story={story} /> : <div>Loading...</div>}</>;
};
export default Writing;
