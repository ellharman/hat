export const runtime = "edge";

export default async function fetchSBDatasource(datasource: string) {
  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/datasource_entries?datasource=${datasource}&token=${process.env.NEXT_PUBLIC_STORYBLOK_TOKEN}`
  );
  const data = await response.json();
  return data;
}
