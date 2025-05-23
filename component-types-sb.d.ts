// This file was generated by the storyblok CLI.
// DO NOT MODIFY THIS FILE BY HAND.
import type { ISbStoryData } from "storyblok";
export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlogPostStoryblok {
  title?: string;
  description?: string;
  content?: RichtextStoryblok;
  component: "blogPost";
  _uid: string;
  [k: string]: any;
}

export interface BlogPostListStoryblok {
  component: "blogPostList";
  _uid: string;
  [k: string]: any;
}

export interface FeatureStoryblok {
  name?: string;
  component: "feature";
  _uid: string;
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: (
    | BlogPostStoryblok
    | BlogPostListStoryblok
    | FeatureStoryblok
    | GridStoryblok
    | PageStoryblok
    | TeaserStoryblok
  )[];
  component: "grid";
  _uid: string;
  [k: string]: any;
}

export interface PageStoryblok {
  title?: string;
  content?: RichtextStoryblok;
  component: "page";
  _uid: string;
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  component: "teaser";
  _uid: string;
  [k: string]: any;
}
