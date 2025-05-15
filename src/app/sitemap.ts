import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ajmeri-satta-king.com'
  
  // Add your static routes
  const routes = [
    '',
    '/results',
    '/chart',
    '/history',
    '/about',
    '/contact',
    '/disclaimer',
    '/terms',
    '/privacy-policy'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/results' ? 'hourly' as const : 'daily' as const,
    priority: route === '' ? 1 : route === '/results' ? 0.9 : 0.8,
  }))

  return routes
} 