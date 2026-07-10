const BASE_URL = 'https://rankflow.ai'

export async function GET() {
  const sitemaps = [
    'products.xml',
    'categories.xml',
    'articles.xml',
    'compare.xml',
    'alternatives.xml',
  ]

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (sitemap) => `
    <sitemap>
      <loc>${BASE_URL}/${sitemap}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `
    )
    .join('')}
</sitemapindex>`

  return new Response(sitemapIndexXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
