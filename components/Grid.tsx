import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

interface GridProps {
  blok: {
    columns: any[];
  };
}

const Grid = ({ blok }: GridProps) => {
  return (
    <div className="grid grid-cols-3" {...storyblokEditable(blok)}>
      {blok.columns.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
