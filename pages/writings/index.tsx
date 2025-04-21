import fetchSB, { StoryVersion } from "../api/storyblok-fetch";
import Link from "next/link";
import { GetStaticProps } from "next";
import React from "react";

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
  const res = await fetchSB("/stories", StoryVersion.DRAFT, "writings/", "created_at:desc");
  const { stories = [] } = await res.json();

  return {
    props: {
      stories,
    },
    revalidate: 30, // Revalidate every minute
  };
};

export default function Writings({ stories }: WritingsProps) {
  stories.sort()
  return (
    <div>
      <main className="flex-1 px-6 py-8">
        {stories.length > 0 ? (
          stories.map((story: Story) => (
            <Link
              key={story.id}
              href={`/writings/${story.slug}`}
              className="block bg-secondary text-contrast h-fit-content bg-opacity-90 p-4 rounded-lg font-semibold my-2"
            >
              <h2>{story.name}</h2>
              <p>{story.content.intro}</p>
            </Link>
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
