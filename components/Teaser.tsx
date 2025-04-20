import { storyblokEditable } from "@storyblok/react";

interface TeaserProps {
  blok: {
    headline: string;
  };
}

const Teaser = ({ blok }: TeaserProps) => {
  return <h2 className="text-2xl mb-10" {...storyblokEditable(blok)}>{blok.headline}</h2>;
};

export default Teaser;
