import { ArticleRepository } from '@/features/articles/repository/article.repository'

const BASE_URL = 'https://rankflow.ai'

export async function GET() {
  const repo = new ArticleRepository();
  const articles = await repo.getArticlesByWorkspace("00000000-0000-0000-0000-000000000000", 100, 0); 

  const published = articles.filter(a => a.status === 'published');

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${published
    .map(
      (article) => `
    <url>
      <loc>${BASE_URL}/blog/${article.slug}</loc>
      <lastmod>${article.created_at || new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join('')}
</urlset>`

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
