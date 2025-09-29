import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  structuredData?: object;
  canonical?: string;
  huntingSpecific?: {
    species?: string[];
    location?: string;
    season?: string;
    huntType?: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/assets/img/gareth/profile/Pic2.JPG',
  url,
  type = 'website',
  structuredData,
  canonical,
  huntingSpecific
}) => {
  const siteName = 'Outback Hunting New Zealand';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullUrl = url ? `https://outbackhuntingnz.com${url}` : 'https://outbackhuntingnz.com';
  
  // Enhanced keywords with hunting-specific terms
  const baseKeywords = 'New Zealand hunting, NZ hunting guides, guided hunting tours, trophy hunting, wilderness hunting, Canterbury hunting, South Island hunting';
  const huntingKeywords = huntingSpecific ? [
    huntingSpecific.species?.map(s => `${s} hunting NZ, ${s} hunting New Zealand`).join(', '),
    huntingSpecific.location ? `hunting in ${huntingSpecific.location}, ${huntingSpecific.location} hunting guide` : '',
    huntingSpecific.season ? `${huntingSpecific.season} hunting season` : '',
    huntingSpecific.huntType ? `${huntingSpecific.huntType} hunting, ${huntingSpecific.huntType} packages` : ''
  ].filter(Boolean).join(', ') : '';
  
  const finalKeywords = keywords ? 
    `${keywords}, ${baseKeywords}${huntingKeywords ? `, ${huntingKeywords}` : ''}` : 
    `${baseKeywords}${huntingKeywords ? `, ${huntingKeywords}` : ''}`;

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
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Gareth Hall - Outback Hunting New Zealand" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="en-NZ" />
      <meta name="geo.region" content="NZ-CAN" />
      <meta name="geo.placename" content="Canterbury, New Zealand" />
      <meta name="geo.position" content="-43.5321;172.6362" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `https://outbackhuntingnz.com${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - New Zealand hunting guide and adventure`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_NZ" />
      <meta property="article:author" content="Gareth Hall" />
      {huntingSpecific?.location && (
        <>
          <meta property="business:contact_data:locality" content={huntingSpecific.location} />
          <meta property="business:contact_data:region" content="South Island" />
          <meta property="business:contact_data:country_name" content="New Zealand" />
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `https://outbackhuntingnz.com${image}`} />
      <meta name="twitter:image:alt" content={`${title} - New Zealand hunting guide and adventure`} />
      <meta name="twitter:site" content="@OutbackHuntingNZ" />
      <meta name="twitter:creator" content="@GarethHallNZ" />
      
      {/* Additional hunting-specific meta tags */}
      {huntingSpecific?.species && (
        <meta name="hunting:species" content={huntingSpecific.species.join(', ')} />
      )}
      {huntingSpecific?.location && (
        <meta name="hunting:location" content={huntingSpecific.location} />
      )}
      {huntingSpecific?.season && (
        <meta name="hunting:season" content={huntingSpecific.season} />
      )}
      {huntingSpecific?.huntType && (
        <meta name="hunting:type" content={huntingSpecific.huntType} />
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Enhanced Business Structured Data */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${fullUrl}#business`,
            "name": "Outback Hunting New Zealand",
            "alternateName": "Outback Hunting NZ",
            "description": "Professional New Zealand hunting guides specializing in Red Deer stag hunting, Tahr alpine hunting, and Chamois mountain hunting. 30+ years experience in Canterbury's wilderness areas offering guided trophy hunting adventures.",
            "url": fullUrl,
            "logo": {
              "@type": "ImageObject",
              "url": "https://outbackhuntingnz.com/assets/img/gareth/GarethLogoC.png",
              "width": 400,
              "height": 400
            },
            "image": [
              {
                "@type": "ImageObject",
                "url": "https://outbackhuntingnz.com/assets/img/gareth/profile/Pic2.JPG",
                "description": "Professional New Zealand hunting guide Gareth Hall"
              },
              {
                "@type": "ImageObject", 
                "url": "https://outbackhuntingnz.com/assets/img/gareth/Deer/DSC00169.JPG",
                "description": "Red Deer stag trophy hunting in New Zealand"
              }
            ],
            "telephone": "+64273113848",
            "email": "garethh85@hotmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "NZ",
              "addressRegion": "Canterbury",
              "addressLocality": huntingSpecific?.location || "Canterbury",
              "postalCode": "8000"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -43.5321,
              "longitude": 172.6362
            },
            "founder": {
              "@type": "Person",
              "name": "Gareth Hall",
              "jobTitle": "Professional Hunting Guide & Owner",
              "description": "Expert hunting guide with 30+ years experience in New Zealand wilderness hunting.",
              "knowsAbout": huntingSpecific?.species || ["Red Deer Hunting", "Tahr Hunting", "Chamois Hunting"]
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "New Zealand Hunting Services",
              "itemListElement": (huntingSpecific?.species || ["Red Deer", "Tahr", "Chamois"]).map(species => ({
                "@type": "Offer",
                "name": `${species} Hunting`,
                "description": `Guided ${species} hunting in ${huntingSpecific?.location || 'Canterbury'} wilderness areas`,
                "category": "Hunting Tours",
                "areaServed": huntingSpecific?.location || "Canterbury, New Zealand"
              }))
            },
            "priceRange": "$$",
            "currenciesAccepted": "NZD",
            "openingHours": "Mo-Su 08:00-18:00",
            "sameAs": [
              "https://www.facebook.com/outbackhuntingnz",
              "https://www.instagram.com/outbackhuntingnz"
            ]
          })}
        </script>
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO; 