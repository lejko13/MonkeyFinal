// Static (non-translatable) service data — IDs, icons, related projects, tech tags
export const servicesMeta = [
  {
    id: 'web-dizajn',
    num: '01',
    icon: '🌐',
    tags: ['Next.js', 'React', 'TypeScript', 'SEO'],
    relatedProjects: ['aardwark', 'sophistit', 'pharminfo'],
  },
  {
    id: 'brand-identita',
    num: '02',
    icon: '✦',
    tags: ['Brand', 'Logo', 'Guidelines', 'Print'],
    relatedProjects: ['panorama-golf', 'neoreal', 'hotel-pod-lipou'],
  },
  {
    id: 'video-reklamy',
    num: '03',
    icon: '▶',
    tags: ['Video Ads', 'Reels', 'Motion', 'AI'],
    relatedProjects: ['aardwark', 'begam'],
  },
  {
    id: 'seo',
    num: '04',
    icon: '↑',
    tags: ['Technical SEO', 'Content', 'Link Building'],
    relatedProjects: ['pharminfo', 'amg-security'],
  },
  {
    id: 'reklamy',
    num: '05',
    icon: '⚡',
    tags: ['Google Ads', 'Meta', 'PPC', 'Analytics'],
    relatedProjects: ['aardwark', 'amg-security', 'begam'],
  },
  {
    id: 'social-media',
    num: '06',
    icon: '◈',
    tags: ['Meta', 'LinkedIn', 'TikTok', 'Strategy'],
    relatedProjects: ['panorama-golf', 'hotel-pod-lipou'],
  },
];

// Merge static meta with translated content from i18n
export function getServices(t) {
  const content = t.servicesContent || {};
  return servicesMeta.map(meta => ({
    ...meta,
    ...(content[meta.id] || {}),
  }));
}

export function getServiceById(id, t) {
  const services = getServices(t);
  return services.find(s => s.id === id) || null;
}

// Legacy list — only static fields, used for Navbar dropdown (now t-aware)
export const services = servicesMeta;