import { ArticleRepository } from '@/features/articles/repository/article.repository'

const BASE_URL = 'https://rankflow.ai'

export async function GET() {
  const repo = new ArticleRepository();
  const articles = await repo.getArticlesByWorkspace("00000000-0000-0000-0000-000000000000", 100, 0); 

  const published = articles.filter(a => a.status === 'published');

  const rssXML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RankFlow AI - Latest Articles</title>
    <link>${BASE_URL}/blog</link>
    <description>The latest insights, tutorials, and comparisons on AI and software tools.</description>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${published
      .map(
        (article) => `
      <item>
        <title><![CDATA[${article.title}]]></title>
        <link>${BASE_URL}/blog/${article.slug}</link>
        <guid>${BASE_URL}/blog/${article.slug}</guid>
        <pubDate>${new Date(article.published_at || article.created_at).toUTCString()}</pubDate>
        <description><![CDATA[${article.excerpt}]]></description>
      </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
