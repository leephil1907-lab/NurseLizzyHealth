import type { MetadataRoute } from 'next';
import { articles } from '../data';
import { knowledgeTopics, learnTopics } from '../education';

const baseUrl = 'https://nurselizzyhealth.vercel.app';
const staticRoutes = ['/', '/hub', '/blog', '/learn', '/guides', '/glossary', '/tools', '/start-here', '/resource-library', '/resources/visual-guides', '/about', '/contact', '/ask', '/privacy', '/terms', '/disclaimer'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map(path => ({ url: `${baseUrl}${path}`, lastModified: now })),
    ...articles.map(article => ({ url: `${baseUrl}/blog/${article.slug}`, lastModified: new Date(article.date) })),
    ...knowledgeTopics.map(topic => ({ url: `${baseUrl}/hub/${topic.slug}`, lastModified: now })),
    ...learnTopics.map(topic => ({ url: `${baseUrl}/resources/${topic.slug}`, lastModified: now })),
  ];
}
