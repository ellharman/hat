export const runtime = 'edge';

export enum StoryVersion {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export default async function fetchSB(
  request: string,
  version: StoryVersion,
  startsWith?: string
) {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_STORYBLOK_API_URL
    }${request}?version=${version}&token=${
      process.env.NEXT_PUBLIC_STORYBLOK_TOKEN
    }${startsWith ? `&starts_with=${startsWith}` : ""}`
  );
}
