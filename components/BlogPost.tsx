import React from "react";
import { render } from "storyblok-rich-text-react-renderer";

const BlogPost = ({ story }) => {
  console.log("Rendering blog post with story:", story);

  const content = story.content;

  return (
    <div className="bg-secondary h-fit-content bg-opacity-90 p-4 rounded-lg font-semibold my-2">
      <h1 className="text-2xl font-bold">{content?.title}</h1>
      <p className="text-sm text-gray-500">{content?.description}</p>
      <div className="mt-4">{render(content?.content)}</div>
    </div>
  );
};

export default BlogPost;
