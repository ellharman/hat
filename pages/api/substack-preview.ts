import * as cheerio from 'cheerio';

export const runtime = "edge";

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const data = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content'),
      author: $('meta[name="author"]').attr('content'),
      thumbnail: $('meta[property="og:image"]').attr('content'),
      publicationName: $('meta[property="og:site_name"]').attr('content')
    };

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}