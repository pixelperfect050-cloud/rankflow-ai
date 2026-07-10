import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RankFlow AI',
    short_name: 'RankFlow',
    description: 'The premier AI-powered Software Intelligence Engine and Content Operating System.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981', // Emerald 500
    icons: [
      {
        src: '/android-chrome-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any'
      }
    ],
  }
}
