# Google Analytics Testing Guide for VogueVault

## Overview
This guide helps you verify that Google Analytics tracking is working correctly on your VogueVault website.

**Your Google Analytics Configuration:**
- **Tracking ID**: G-EL6CZ1FWSG
- **Property ID**: G-PZESQ0LDPG
- **Stream Name**: voguevaults.store
- **Stream URL**: https://www.voguevaults.store/
- **Stream ID**: 1127027074

## Quick Verification Steps

### 1. Real-Time Testing (Immediate Results)

1. **Open Google Analytics Dashboard**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Select your VogueVault property

2. **Navigate to Real-Time Reports**
   - Click on "Reports" in the left sidebar
   - Click on "Realtime" → "Overview"

3. **Test Your Website**
   - Open your website: https://www.voguevaults.store/
   - Navigate between different pages
   - You should see activity appear in the Real-Time report within 30 seconds

### 2. Development Testing (Using Debug Tools)

If you're running the site in development mode:

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Look for Debug Button**
   - A "GA Debug" button will appear in the bottom-right corner
   - Click it to see analytics status

3. **Test Analytics**
   - Click "Send Test Event" to send a test event
   - Click "Log Debug Info" to see console information

### 3. Browser Developer Tools Testing

1. **Open Developer Tools** (F12)
2. **Go to Console Tab**
3. **Check for Analytics Loading**
   ```javascript
   // Type this in console to check if gtag is loaded:
   typeof window.gtag
   // Should return "function"
   
   // Check dataLayer:
   window.dataLayer
   // Should return an array with tracking data
   ```

4. **Send Manual Test Event**
   ```javascript
   // Send a test event manually:
   gtag('event', 'test_event', {
     event_category: 'manual_test',
     event_label: 'console_test'
   });
   ```

### 4. Network Tab Verification

1. **Open Developer Tools** → **Network Tab**
2. **Reload the page**
3. **Look for these requests**:
   - `gtag/js?id=G-EL6CZ1FWSG` (should return 200)
   - `collect` requests to `google-analytics.com` or `googletagmanager.com`

## Common Issues and Solutions

### Issue 1: No Data in Real-Time Reports

**Possible Causes:**
- Ad blockers blocking analytics
- Incorrect tracking ID
- Script not loading properly
- Testing on localhost instead of production

**Solutions:**
1. Disable ad blockers temporarily
2. Verify tracking ID matches: G-EL6CZ1FWSG
3. Check browser console for JavaScript errors
4. Test on production URL: https://www.voguevaults.store/

### Issue 2: Script Loading Errors

**Check for:**
- Network connectivity issues
- Content Security Policy blocking scripts
- JavaScript errors preventing gtag initialization

**Debug Steps:**
1. Check browser console for errors
2. Verify script tags in page source
3. Test on different browsers/devices

### Issue 3: Events Not Tracking

**Verify:**
- Custom events are properly formatted
- gtag function is available when events are sent
- No JavaScript errors in console

## Testing Checklist

- [ ] Real-time reports show page views
- [ ] Multiple page navigation tracked
- [ ] Custom events appear in reports
- [ ] No JavaScript errors in console
- [ ] Analytics script loads successfully
- [ ] dataLayer is populated
- [ ] gtag function is available

## Advanced Testing

### Enhanced Ecommerce Testing
If you plan to add ecommerce tracking:

```javascript
// Test purchase event
gtag('event', 'purchase', {
  transaction_id: 'test_12345',
  value: 25.42,
  currency: 'USD',
  items: [{
    item_id: 'test_item',
    item_name: 'Test Product',
    category: 'fashion',
    quantity: 1,
    price: 25.42
  }]
});
```

### Custom Dimensions Testing
```javascript
// Test custom dimensions
gtag('config', 'G-EL6CZ1FWSG', {
  custom_map: {
    'custom_parameter_1': 'user_type'
  }
});
```

## Troubleshooting Commands

Run these in your browser console for debugging:

```javascript
// Check if analytics is working
console.log('gtag available:', typeof window.gtag === 'function');
console.log('dataLayer:', window.dataLayer);

// Send test page view
gtag('config', 'G-EL6CZ1FWSG', {
  page_title: 'Test Page',
  page_location: window.location.href
});

// Check for blocked requests
console.log('Check Network tab for blocked analytics requests');
```

## Expected Timeline for Data

- **Real-Time Reports**: 30 seconds to 2 minutes
- **Standard Reports**: 24-48 hours
- **Custom Events**: Appear in real-time, processed in standard reports within 24-48 hours

## Support

If you continue to experience issues:

1. Check the browser console for errors
2. Verify your Google Analytics property settings
3. Ensure the tracking ID G-EL6CZ1FWSG is correct
4. Test with different browsers and devices
5. Contact Google Analytics support if needed

## Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Real-Time Reports Help](https://support.google.com/analytics/answer/1638635)
- [Debugging Guide](https://developers.google.com/analytics/devguides/collection/ga4/debug)
