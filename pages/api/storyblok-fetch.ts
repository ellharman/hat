export const runtime = "edge";

export enum StoryVersion {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export type RevalidateOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export default async function fetchSB(
  request: string,
  version: StoryVersion,
  startsWith?: string,
  sort?: string,
  options?: RevalidateOptions
) {
  const url = `${
    process.env.NEXT_PUBLIC_STORYBLOK_API_URL
  }${request}?version=${version}${sort ? `&sort_by=${sort}` : ""}&token=${
    process.env.NEXT_PUBLIC_STORYBLOK_TOKEN
  }${startsWith ? `&starts_with=${startsWith}` : ""}`;

  return fetch(url, {
    next: {
      revalidate: options?.revalidate, // Set to number of seconds or false to opt out
      tags: options?.tags, // Optional cache tags for on-demand revalidation
    },
  });
}
