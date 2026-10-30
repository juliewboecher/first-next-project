// All fetch calls to WordPress are collected here, so the pages can reuse them
import { cacheLife } from "next/cache";

const API_URL = `${process.env.WORDPRESS_URL}/wp-json/wp/v2`;

export async function getPosts() {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`${API_URL}/posts?_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}

export async function getLatestPosts() {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`${API_URL}/posts?per_page=3&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  const posts = await response.json();
  return posts;
}

export async function getPostBySlug(slug) {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  // WordPress always returns an array, even for a single match
  const posts = await response.json();
  return posts[0];
}

export async function getPageBySlug(slug) {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`WordPress responded with ${response.status}`);
  }

  // WordPress always returns an array, even for a single match
  const pages = await response.json();
  return pages[0];
}
