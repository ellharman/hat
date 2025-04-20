import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

interface PageProps {
  blok: {
    body: any[];
  };
}

const Page = ({ blok }: PageProps) => (
  <main className="text-center mt-4" {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
