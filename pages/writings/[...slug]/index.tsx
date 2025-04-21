export const runtime = 'edge';

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import fetchSB, { StoryVersion } from "../../api/storyblok-fetch";
import BlogPost from "../../../components/BlogPost";

const WritingSlugPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [story, setStory] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const res = await fetchSB(
          `/stories/writings/${slug}`,
          StoryVersion.DRAFT
        );
        const data = await res.json();
        console.log("Fetched data:", data);
        setStory(data.story); // Store the complete story object
      } catch (err) {
        console.error("Error fetching Storyblok content:", err);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <Layout>
      {story ? <BlogPost story={story} /> : <div>Loading...</div>}
    </Layout>
  );
};

export default WritingSlugPage;
