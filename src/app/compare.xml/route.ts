const BASE_URL = 'https://rankflow.ai'

export async function GET() {
  // In a real database with millions of permutations, you would query a 'popular_comparisons' 
  // table or analytics table. For MVP, we'll hardcode the structural examples.
  const comparisons = [
    'chatgpt-vs-claude',
    'notion-vs-clickup',
    'figma-vs-penpot',
    'cursor-vs-windsurf'
  ]

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${comparisons
    .map(
      (slug) => `
    <url>
      <loc>${BASE_URL}/compare/${slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
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
