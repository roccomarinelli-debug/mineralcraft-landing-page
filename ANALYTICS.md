# MINERALCRAFT Landing Page - Analytics & Tracking Guide

## 🔍 Comprehensive Tracking System

The landing page includes a robust analytics system that tracks every user interaction, providing detailed insights into user behavior and conversion paths.

## 📊 Tracked Events

### **Page & Navigation**
- `Page_Load` - Initial page visit
- `Section_View` - When user scrolls to each section
- `page_view` - Standard page view tracking

### **Call-to-Action Interactions**
- `CTA_Click` - Both hero "TRY IT NOW" and final "BUY NOW" buttons
- Links to: `https://mineralcraft.co/products/italian-alps-1`
- Tracks location: Hero vs Final CTA

### **Customization Features**
- `Theme_Selector_Open` - When user opens color palette
- `Theme_Change` - When user selects different color scheme
- Tracks: Theme name and user preferences

### **Calculator Engagement**
- `Calculator_Adjust` - When user changes monthly litres slider
- `Calculator_Brand_Change` - San Pellegrino vs Perrier selection
- Tracks: User preferences and potential savings calculations

### **Content Engagement**
- `FAQ_Toggle` - When user opens/closes FAQ items
- `Promo_Banner_Click` - Promotional banner interactions
- Tracks: Which content resonates most with users

### **Section Visibility**
- Automatically tracks when users view each section:
  - Hero Section
  - Features Section  
  - 2-Step Process Section
  - Calculator Section
  - Final CTA Section
  - FAQ Section

## 🛠 Analytics Implementation

### **Built-in Tracking System**
```typescript
// Every event includes:
{
  action: string,        // What happened
  category: string,      // Section/type
  label: string,         // Specific details
  timestamp: number,     // When it happened
  sessionId: string      // Unique session ID
}
```

### **Local Storage Backup**
- All events stored locally for debugging
- Keeps last 100 events per browser
- Accessible via browser dev tools
- Key: `mineralcraft_events`

### **Console Logging**
- Development mode shows all events in console
- Format: `🔍 Analytics Event: {event details}`
- Helpful for testing and debugging

## 📈 Analytics Platforms

### **Google Analytics 4 (GA4)**
**Setup Required:**
1. Replace `GA_MEASUREMENT_ID` in `public/analytics.html`
2. Add analytics script to `public/index.html` `<head>` section
3. Configure Enhanced Ecommerce in GA4 dashboard

**Custom Events Sent:**
- All interaction events with category/label structure
- Page views with custom parameters
- Conversion tracking for both CTAs

**Custom Dimensions Available:**
- `source_page`: Landing page identification
- `theme_selection`: User color preferences  
- `calculator_interaction`: Savings calculations

### **Facebook Pixel**
**Setup Required:**
1. Replace `FACEBOOK_PIXEL_ID` in `public/analytics.html`
2. Add pixel script to `public/index.html`
3. Configure Custom Conversions in Facebook Ads Manager

**Events Tracked:**
- `PageView` - Standard page view
- `ViewContent` - Landing page content view
- `CTA_Click` - Both CTA button clicks
- Custom events for calculator and theme interactions

### **Optional: Hotjar Heatmaps**
**Setup:**
1. Replace `HOTJAR_ID` in `public/analytics.html`
2. Provides visual heatmaps and session recordings
3. Shows exactly where users click and scroll

## 🔧 Implementation Steps

### **1. Add Analytics Scripts**
Copy contents from `public/analytics.html` to `public/index.html` in the `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Existing head content -->
  
  <!-- INSERT ANALYTICS SCRIPTS HERE -->
  <!-- Content from public/analytics.html -->
  
</head>
<body>
```

### **2. Replace Tracking IDs**
Update these placeholder values:
- `GA_MEASUREMENT_ID` → Your Google Analytics 4 ID
- `FACEBOOK_PIXEL_ID` → Your Facebook Pixel ID  
- `HOTJAR_ID` → Your Hotjar ID (optional)

### **3. Configure Platforms**

**Google Analytics 4:**
- Enable Enhanced Ecommerce
- Set up Custom Dimensions for theme and calculator data
- Configure Goals for CTA clicks
- Set up Audiences for retargeting

**Facebook Ads Manager:**
- Create Custom Conversions for CTA clicks
- Set up Lookalike Audiences
- Configure Dynamic Ads for retargeting

### **4. Test Implementation**
```bash
# Start development server
npm start

# Open browser dev tools → Console
# Look for: 🔍 Analytics Event: {event details}

# Test all interactions:
# - Click CTAs
# - Change themes  
# - Use calculator
# - Open FAQ items
# - Scroll through sections
```

## 📋 Key Metrics to Monitor

### **Conversion Funnel**
1. **Page Load** → Landing page traffic
2. **Hero Section View** → Initial engagement  
3. **Features Section View** → Interest development
4. **Calculator Interaction** → Purchase consideration
5. **CTA Click** → Conversion intent
6. **Product Page Visit** → Final conversion

### **Engagement Metrics**
- **Theme Changes** → Personalization engagement
- **FAQ Opens** → Information seeking behavior
- **Calculator Usage** → Purchase research
- **Section Completion Rate** → Content effectiveness

### **Performance KPIs**
- **CTA Click Rate** → Hero vs Final CTA performance
- **Calculator Completion** → User engagement depth
- **Theme Customization Rate** → Interactive feature usage
- **FAQ Engagement** → Content relevance
- **Session Duration** → Page stickiness

## 🔍 Data Analysis Tips

### **User Behavior Insights**
- Track most popular color themes
- Identify optimal calculator settings
- Monitor FAQ question performance
- Analyze scroll depth by section

### **Conversion Optimization**
- Compare Hero vs Final CTA performance  
- Test theme impact on conversions
- Analyze calculator value correlations
- Monitor promotional banner effectiveness

### **A/B Testing Opportunities**
- Different CTA button text
- Alternative color schemes
- Calculator default values
- FAQ question ordering

## 🚨 Privacy & Compliance

### **GDPR Compliance**
- Analytics tracking respects user consent
- No personal data stored locally
- Session IDs are anonymous
- Easy to implement consent banner if needed

### **Data Security**
- All tracking uses HTTPS
- No sensitive information captured
- Local storage cleaned automatically
- Session data expires with browser session

## 📞 Analytics Support

### **Debugging Events**
```javascript
// View all stored events
console.log(JSON.parse(localStorage.getItem('mineralcraft_events')));

// View current session ID  
console.log(sessionStorage.getItem('mineralcraft_session_id'));

// Manual event tracking test
trackEvent('Test_Event', 'Debug', 'Manual Test');
```

### **Common Issues**
1. **Events not showing in GA4**: Check Measurement ID
2. **Facebook Pixel not firing**: Verify Pixel ID and domain
3. **Console errors**: Check for ad blockers
4. **Local storage full**: Automatic cleanup after 100 events

---

**Last Updated**: September 2024
**Tracking Version**: 1.0
**Next Review**: Monthly analytics performance review