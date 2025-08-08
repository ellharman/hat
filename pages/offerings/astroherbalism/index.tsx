import { GetStaticProps } from "next";
import fetchSB, { StoryVersion } from "../../api/storyblok-fetch";
import { PageStoryblok } from "../../../component-types-sb";
import Page from "../../../components/Page";
import InquiryForm from "../../../components/InquiryForm";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetchSB("/stories", StoryVersion.DRAFT, `astroherbalism`);
  const { stories = [] } = await res.json();

  const mostRecentStory = stories.reduce(
    (
      latest: {
        created_at: string;
      },
      story: {
        created_at: string;
      }
    ) => {
      return new Date(story.created_at) > new Date(latest.created_at)
        ? story
        : latest;
    },
    stories[0]
  );

  return {
    props: {
      story: mostRecentStory || null,
    },
    revalidate: 30, // Revalidate every minute
  };
};

const Astroherbalism: React.FC<PageStoryblok> = ({ story }) => {
  return (
    <>
      {story ? <Page story={story} /> : <div>Loading...</div>}
      <InquiryForm />
    </>
  );
};

export default Astroherbalism;
