const SITE_URL = 'https://aishield.magedata.ai';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mage Data AI Shield',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description: 'Making enterprise data safe for AI. The missing layer between production databases and ML platforms.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3 Columbus Circle, 15th Floor',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Mage Data',
      url: 'https://magedata.ai',
    },
    sameAs: [
      'https://linkedin.com/company/magedata',
      'https://youtube.com/@magedata',
    ],
  };
}

export function productSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Cloud, On-premises',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free AI data risk assessment available',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mage Data AI Shield',
      url: SITE_URL,
    },
  };
}

export function articleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  author: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mage Data AI Shield',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mage Data AI Shield',
      url: SITE_URL,
    },
  };
}
