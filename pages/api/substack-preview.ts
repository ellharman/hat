import * as cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  
  try {
    const response = await fetch(url as string);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const data = {
      title: $('meta[property="og:title"]').attr('content') || $('title').text(),
      description: $('meta[property="og:description"]').attr('content'),
      author: $('meta[name="author"]').attr('content'),
      thumbnail: $('meta[property="og:image"]').attr('content'),
      publicationName: $('meta[property="og:site_name"]').attr('content')
    };
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}