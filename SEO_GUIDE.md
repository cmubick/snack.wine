# SEO Setup Guide

## Google Analytics 4 Setup

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for `snack.wine`
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)
4. In `index.html`, replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID
5. Verify tracking is working in GA4 dashboard

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://snack.wine`
3. Verify ownership via DNS record:
   - Copy the verification code
   - Add DNS TXT record in Route 53
4. Submit sitemap: `https://snack.wine/sitemap.xml`
5. Monitor indexing status and search performance

## SEO Optimizations Implemented

### Meta Tags
- **Title**: Includes primary keywords (wine spritzers, low-ABV)
- **Description**: 160 characters with compelling call-to-action
- **Keywords**: Primary and supporting keywords
- **Open Graph**: Social sharing images and descriptions
- **Twitter Card**: Optimized for Twitter/X sharing

### Structured Data (JSON-LD)
- **Organization Schema**: Company info, logo, social links
- **Product Schema**: Product details, brand, pre-order status
- **Breadcrumb-ready**: Foundation for future blog content

### Technical SEO
- **Robots.txt**: Allows all crawlers, references sitemap
- **Sitemap.xml**: Index page with update frequency
- **Canonical URL**: Prevents duplicate content issues
- **Semantic HTML**: Proper heading hierarchy, header/footer tags
- **Accessibility**: ARIA labels for form and status messages

### Images
- **Alt Text**: Descriptive alt attributes for hero images
- **Responsive Images**: Picture element for different resolutions
- **WebP Format**: Optimized file formats for fast loading

## Future SEO Enhancements

### Blog Content
Target these keywords in future blog posts:
- "low alcohol wine drinks"
- "wine alternatives"
- "best wine spritzers"
- "portable wine"
- "day drinking wine" (casual, lifestyle angle)

### Link Building
- Reach out to wine lifestyle bloggers
- Partner with wellness/health sites (low-ABV angle)
- Guest posts on beverage industry publications

### Social Signals
- Instagram: [@snackwines](https://instagram.com/snackwines)
- Share user-generated content
- Wine community engagement

### Email Marketing
- Build email list via waitlist
- Send launch announcements
- Share exclusive content with subscribers

## Monitoring

### Monthly Checks
- Google Search Console: Impressions, clicks, average position
- Google Analytics: Traffic sources, user behavior, conversions
- Core Web Vitals: Page speed, interactivity, visual stability
- Keyword rankings: Track primary keywords in search results

### Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Google Mobile Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema.org Validator](https://validator.schema.org)
