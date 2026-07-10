import { CategoryRepository } from '@/features/categories/repository/category.repository'

const BASE_URL = 'https://rankflow.ai'

export async function GET() {
  const repo = new CategoryRepository();
  const categories = await repo.getCategoriesByWorkspace("00000000-0000-0000-0000-000000000000");

  // Flatten the tree for sitemap
  const flatCategories: any[] = [];
  const flatten = (cats: any[]) => {
    cats.forEach(c => {
      // Must be public & published based on user instructions
      if (c.visibility === 'public' && c.status === 'published') {
        flatCategories.push(c);
      }
      if (c.children?.length > 0) {
        flatten(c.children);
      }
    });
  }
  flatten(categories);

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/categories</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${flatCategories
    .map(
      (cat) => `
    <url>
      <loc>${BASE_URL}/category/${cat.slug}</loc>
      <lastmod>${cat.created_at || new Date().toISOString()}</lastmod>
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
