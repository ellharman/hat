import React from "react";
import { BlogPostStoryblok } from "../component-types-sb";
import { richTextResolver } from "@storyblok/richtext";
const { render } = richTextResolver();

const BlogPost = ({ story }: { story: BlogPostStoryblok }) => {
  const content = story.content;

  return (
    <div className="bg-secondary h-fit-content bg-opacity-90 p-4 rounded-lg font-semibold my-2">
      <h1 className="text-2xl font-bold">{content?.title}</h1>
      <p className="text-sm text-neutral-500">{content?.description}</p>
      {content?.content && (
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{
            __html: render(content.content as any) as string, // Casting to any
          }}
        ></div>
      )}
    </div>
  );
};

export default BlogPost;
