# Google AdSense Policy Compliance Guide

This guide outlines the key policies and best practices to ensure your website remains compliant with Google AdSense policies and avoids ad serving limitations.

## Common Policy Violations

### 1. Invalid Traffic

**What it is:** Clicks or impressions that aren't from genuine user interest.

**How to avoid:**
- Don't click on your own ads
- Don't encourage users to click on ads
- Don't use automated traffic sources
- Implement reCAPTCHA if you suspect bot traffic
- Monitor traffic sources for unusual patterns

### 2. Ad Placement Issues

**What it is:** Placing ads in ways that violate Google's policies.

**How to avoid:**
- Keep at least 150px between ads
- Don't place ads near navigation elements or clickable areas
- Don't place ads where they might be accidentally clicked
- Limit the number of ads per page (max 3-4 for most pages)
- Don't place ads in pop-ups or pop-unders
- Don't place ads in emails or software

### 3. Content Policy Violations

**What it is:** Content that violates Google's content policies.

**How to avoid:**
- No adult content, including suggestive or explicit material
- No illegal content or promotion of illegal activities
- No violent or shocking content
- No content that promotes discrimination
- No content that promotes dangerous products or services
- No content that infringes on copyrights

### 4. Technical Implementation Issues

**What it is:** Technical issues with how ads are implemented.

**How to avoid:**
- Only load the AdSense script once per page
- Don't modify the AdSense code
- Don't place ads in iframes
- Don't hide ads or make them invisible
- Don't implement ads in a way that causes layout shifts
- Ensure ads are responsive and display properly on all devices

## Best Practices

### 1. Ad Density

- Maintain a good balance between content and ads
- Follow the "content-first" approach
- Avoid having more ads than content ("ad-heavy" pages)

### 2. Ad Placement

- Place ads where they naturally fit within your content
- Use in-content ads sparingly and only where they make sense
- Keep ads clearly distinguishable from your content

### 3. User Experience

- Prioritize user experience over ad revenue
- Ensure your site loads quickly
- Minimize layout shifts when ads load
- Use responsive ad units that adapt to different screen sizes

### 4. Regular Monitoring

- Regularly check your AdSense account for policy notifications
- Monitor your site's performance and user behavior
- Address any issues promptly

## What to Do If Ad Serving is Limited

1. **Check for Policy Violations:** Log in to your AdSense account and check the Policy Center for specific violations.

2. **Fix the Issues:** Address all identified policy violations.

3. **Request a Review:** Once you've fixed the issues, request a review through your AdSense account.

4. **Be Patient:** The review process can take several days to weeks.

5. **Prevent Future Violations:** Implement the best practices outlined in this guide to prevent future issues.

## Technical Implementation Guidelines

### Script Loading

```jsx
// Load the AdSense script ONCE in the head section
<head>
  <AdSenseScript />
</head>
```

### Ad Initialization

```jsx
// Initialize ads with proper error handling and timing
useEffect(() => {
  if (typeof window === 'undefined') return;
  
  // Check if AdSense script is loaded
  const checkAdSenseLoaded = () => {
    return typeof (window as any).adsbygoogle !== 'undefined';
  };
  
  // Initialize with sufficient delay
  const timer = setTimeout(() => {
    if (checkAdSenseLoaded()) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, 500);
  
  return () => clearTimeout(timer);
}, []);
```

### CSS Guidelines

```css
/* Ensure proper spacing */
.ad-container {
  margin: 2.5rem 0;
  min-height: 90px;
  clear: both;
}

/* Ensure proper spacing between multiple ads */
.ad-container + .ad-container {
  margin-top: 4rem;
}
```

## Resources

- [Google AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- [Ad Placement Policies](https://support.google.com/adsense/answer/1346295)
- [Invalid Traffic Policy](https://support.google.com/adsense/answer/16737)
- [Content Policies](https://support.google.com/adsense/answer/1348688)
