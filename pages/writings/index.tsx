import Head from "next/head";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import fetchSB, { StoryVersion } from "./storyblok-fetch";
import Link from "next/link";

type Story = {
  id: number;
  name: string;
  content: {
    intro?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export default function Writings() {
  const [slugList, setSlugList] = useState<Story[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchSB("/stories", StoryVersion.DRAFT, "writings/");
        const data = await res.json();
        console.log("Fetched Storyblok content:", data);
        setSlugList(data.stories);
      } catch (err) {
        console.error("Error fetching Storyblok content:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex-1 px-6 py-8">
          {slugList && slugList.length > 0 ? (
            slugList.map((story) => (
              <Link
                key={story.id}
                href={`/writings/${story.slug}`}
                className="block bg-secondary h-fit-content bg-opacity-90 p-4 rounded-lg font-semibold my-2"
              >
                <h2>{story.name}</h2>
                <p>{story.content.intro}</p>
              </Link>
            ))
          ) : (
            <p>No stories available.</p>
          )}
        </main>
      </Layout>
    </div>
  );
}
