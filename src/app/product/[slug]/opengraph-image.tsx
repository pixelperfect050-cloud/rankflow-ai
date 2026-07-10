import { ImageResponse } from 'next/og'
import { ProductRepository } from '@/features/products/repository/product.repository'

export const runtime = 'edge'
export const alt = 'RankFlow AI Product Intelligence'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  // Try to fetch product, fallback to generic if not found (edge runtime requires API or fetch, 
  // but if we are using edge we might need to fetch from an absolute URL instead of repository 
  // if the repository relies on Node.js APIs like pg. 
  // For MVP we just use the slug to generate dynamic text without DB lookup).
  
  const formattedName = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #0f172a, #1e293b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 40, color: '#10b981', marginBottom: 20, fontWeight: 'bold' }}>
          RankFlow AI
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bolder',
            textAlign: 'center',
            marginBottom: 40,
            lineHeight: 1.2,
          }}
        >
          {formattedName}
        </div>
        <div style={{ fontSize: 32, color: '#94a3b8', textAlign: 'center' }}>
          Product Intelligence, Alternatives, & Integrations
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
