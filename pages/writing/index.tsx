import fetchSB, { StoryVersion } from "../api/storyblok-fetch";
import Link from "next/link";
import { GetStaticProps } from "next";
import React from "react";
import SubstackEmbed from "../../components/SubstackEmbed";

type Story = {
  id: number;
  name: string;
  content: {
    intro?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

type WritingsProps = {
  stories: Story[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetchSB(
    "/stories",
    StoryVersion.DRAFT,
    "writings/",
    "created_at:desc"
  );
  const { stories = [] } = await res.json();

  return {
    props: {
      stories,
    },
    revalidate: 30, // Revalidate every minute
  };
};

export default function Writings({ stories }: WritingsProps) {
  stories.sort();
  return (
    <div>
      <main className="flex-1 px-6 py-8">
        {stories.length > 0 ? (
          stories.map((story: Story) => (
            <SubstackEmbed
              key={story.id}
              url={story.content.substack_url}
              className="mb-12"
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-2xl">Loading...</p>
          </div>
        )}
      </main>
    </div>
  );
}
