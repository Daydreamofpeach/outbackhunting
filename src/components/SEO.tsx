import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/assets/img/logo.png',
  url,
  type = 'website',
  structuredData,
  canonical
}) => {
  const siteName = 'Outback Hunting New Zealand';
  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = url ? `https://outbackhuntingnz.com${url}` : 'https://outbackhuntingnz.com';

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [fullTitle, description]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@nzwildhunt" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Outback Hunting New Zealand" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Business Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristInformationCenter",
          "name": "Outback Hunting New Zealand",
          "alternateName": "Outback Hunting NZ",
          "description": "Professional hunting guides offering guided hunting tours and packages in New Zealand's South Island wilderness areas. Specializing in Red Deer, Himalayan Tahr, Chamois, Whitetail, Fallow Deer, and Arapawa Ram hunting.",
          "url": "https://outbackhuntingnz.com",
                     "logo": "https://outbackhuntingnz.com/assets/img/logo.png",
           "image": "https://outbackhuntingnz.com/assets/img/logo.png",
          "telephone": "+64-XXX-XXX-XXXX",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "NZ",
            "addressRegion": "South Island",
            "addressLocality": "New Zealand"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -45.0,
            "longitude": 170.0
          },
          "openingHours": "Mo-Su 08:00-18:00",
          "priceRange": "$$",
          "currenciesAccepted": "AUD, NZD",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "areaServed": {
            "@type": "Country",
            "name": "New Zealand"
          },
          "serviceArea": {
            "@type": "Country",
            "name": "New Zealand"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Hunting Packages",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Red Deer Wilderness Hunt",
                  "description": "Free range Red Stag hunting in New Zealand wilderness"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Himalayan Tahr Hunt",
                  "description": "Alpine hunting for Himalayan Tahr in Southern Alps"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Chamois Hunt",
                  "description": "Mountain hunting for Chamois in alpine terrain"
                }
              }
            ]
          },
          "sameAs": [
            "https://www.facebook.com/outbackhuntingnz",
            "https://www.instagram.com/outbackhuntingnz"
          ]
        })}
      </script>
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO; 