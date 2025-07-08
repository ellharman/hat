import React from "react";
import { PageStoryblok } from "../component-types-sb";
import { richTextResolver } from "@storyblok/richtext";
const { render } = richTextResolver();

const Page = ({ story }: { story: PageStoryblok }) => {
  const content = story.content as any;

  if (!content?.content) {
    return null;
  }

  // Render the rich text content to HTML string
  const renderedContent = render(content.content as any) as string;

  // Parse through the HTML string and wrap images in a div with class "image-container"
  const contentWithWrappedImages = renderedContent.replace(
    /<img([^>]+)>/g,
    '<div class="sb-image-container"><img$1></div>'
  );

  return (
    <div className="bg-secondary h-fit-content bg-opacity-90 p-4 rounded-lg font-semibold my-2">
      <h1 className="text-2xl font-bold">{content?.title}</h1>
      <p className="text-sm text-neutral-500">{content?.description}</p>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{
          __html: contentWithWrappedImages,
        }}
      />
    </div>
  );
};

export default Page;
