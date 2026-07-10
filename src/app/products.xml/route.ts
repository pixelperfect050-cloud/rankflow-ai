import { ProductRepository } from '@/features/products/repository/product.repository'

const BASE_URL = 'https://rankflow.ai'

export async function GET() {
  const repo = new ProductRepository();
  const products = await repo.searchProducts("00000000-0000-0000-0000-000000000000"); // Real app: filter properly

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/products</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${products
    .map(
      (product) => `
    <url>
      <loc>${BASE_URL}/product/${product.slug}</loc>
      <lastmod>${product.created_at || new Date().toISOString()}</lastmod>
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
