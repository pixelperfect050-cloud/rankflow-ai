export const SITE_CONFIG = {
  name: 'RankFlow AI',
  description: 'The ultimate directory for AI, SaaS, Marketing, and Developer tools.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  logo: '/images/logo.png',
  social: {
    twitter: 'https://twitter.com/rankflowai',
    github: 'https://github.com/rankflowai'
  }
}

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blog' },
  { label: 'Compare', href: '/compare' },
  { label: 'Deals', href: '/deals' },
  { label: 'News', href: '/news' },
]

export const ADMIN_NAV_ITEMS = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' }
    ]
  },
  {
    group: 'Content',
    items: [
      { label: 'Articles', href: '/admin/articles', icon: 'FileText' },
      { label: 'Categories', href: '/admin/categories', icon: 'FolderTree' },
      { label: 'Tags', href: '/admin/tags', icon: 'Tags' },
      { label: 'Media', href: '/admin/media', icon: 'Image' },
    ]
  },
  {
    group: 'Tools Directory',
    items: [
      { label: 'All Tools', href: '/admin/tools', icon: 'Wrench' },
      { label: 'Submissions', href: '/admin/tools/submissions', icon: 'Inbox' },
      { label: 'Comparisons', href: '/admin/comparisons', icon: 'GitCompare' },
    ]
  },
  {
    group: 'Monetization',
    items: [
      { label: 'Affiliates', href: '/admin/affiliates', icon: 'Link' },
      { label: 'Deals', href: '/admin/deals', icon: 'Tag' },
    ]
  },
  {
    group: 'AI Engine',
    items: [
      { label: 'Bulk Generator', href: '/admin/ai/bulk', icon: 'Wand2' },
      { label: 'Programmatic SEO', href: '/admin/programmatic-seo', icon: 'Sparkles' },
    ]
  }
]

export const PRICING_TYPES = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'open-source', label: 'Open Source' }
]

export const PLATFORMS = [
  { value: 'web', label: 'Web' },
  { value: 'windows', label: 'Windows' },
  { value: 'mac', label: 'Mac' },
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'linux', label: 'Linux' },
]

export const ARTICLE_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'Needs Review' },
  { value: 'published', label: 'Published' },
  { value: 'scheduled', label: 'Scheduled' },
]

export const TOOL_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'published', label: 'Published' },
]
