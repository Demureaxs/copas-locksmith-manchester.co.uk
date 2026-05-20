import { MetadataRoute } from 'next';
import config from '@/data/config.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.url || '';

  // Base routes
  const routes = ['', '/services', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic Service routes
  const serviceRoutes = config.services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic Blog routes
  const blogRoutes = config.blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  return [...routes, ...serviceRoutes, ...blogRoutes];
}
