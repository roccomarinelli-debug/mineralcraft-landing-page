# MINERALCRAFT Landing Page

A premium campaign landing page for MINERALCRAFT sparkling water, designed for Meta/Instagram ads with cutting-edge animations and mobile-first approach.

## 🚀 Features

- **Mobile-First Design** - Optimized for 70%+ mobile users
- **Premium Animations** - Framer Motion powered interactions
- **Brand-Compliant** - Official color palette and typography
- **Conversion-Optimized** - Strategic CTAs and social proof
- **Responsive** - Perfect across all devices
- **Accessible** - WCAG compliant with reduced motion support

## 🎨 Brand Guidelines

- **Colors**: #494B33, #CEB49F, #C27061, #E0D0D0, #35271C
- **Typography**: Playfair Display SC (headers), Josefin Sans (body)
- **Mobile-first approach** for optimal user experience

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Framer Motion** for animations
- **React Intersection Observer** for scroll triggers
- **Lucide React** for premium icons
- **CSS Grid & Flexbox** for responsive layouts

## 📱 Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   ```bash
   # Install Netlify CLI if needed
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod --dir=build
   ```

3. Set up continuous deployment by connecting your GitHub repository to Netlify.

### Alternative Deployment Options

- **Vercel**: `vercel --prod`
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload `build/` folder to S3 bucket

## 📊 Performance Optimizations

- **Image optimization** with next-gen formats
- **Code splitting** for faster load times
- **CSS animations** optimized for 60fps
- **Lazy loading** for scroll-triggered animations
- **Mobile-first CSS** for optimal mobile performance

## 📝 Content Management

### Quick Copy Updates

All website copy is located in `src/App.tsx`. Here's a reference guide:

#### **Promotional Banner**
- **Line 287**: "Use code 'LAUNCH' for 20% OFF your first purchase ✨"

#### **Hero Section**
- **Line 294**: "TRANSFORM YOUR BUBBLES" (main headline)
- **Line 302**: "Elevate the taste of your Sodastream water to the mineral profile of the Italian Alps." (subtitle)
- **Line 315**: "TRY IT NOW" (CTA button)

#### **Features Section** 
- **Line 374**: "NATURE'S SOFT DRINK, PERFECTED." (section header)
- **Line 381**: "EXCEPTIONAL TASTE" + description
- **Line 387**: "MUCH MORE THAN BUBBLES" + description  
- **Line 393**: "A LUXURIOUS HYDRATION RITUAL" + description
- **Line 399**: "SUSTAINABLE & SMARTER" + description

#### **2-Step Process Section**
- **Line 483**: "Craft the taste of the Italian Alps in 2 steps"
- **Line 494**: "Step 1" + description
- **Line 498**: "Step 2" + description

#### **Calculator Section**
- **Line 590**: "Calculate Your Savings"
- **Line 599**: Calculator subtitle

#### **Final CTA Section**
- **Line 741**: "MAKES OVER 25 LITRES"
- **Line 752**: "Add one scoop and carbonate..."
- **Line 765**: "LOVE IT OR MONEY BACK"
- **Line 776**: "BUY NOW"

#### **FAQ Section** 
- **Lines 22-45**: All FAQ questions and answers

### **Update Process:**
1. Edit `src/App.tsx` 
2. Find the line numbers above
3. Update the text between quotes
4. Commit: `git add . && git commit -m "Update copy"`  
5. Push: `git push` (auto-deploys in 2-4 minutes)

## 🖼️ Image Management

### Current Image Structure
```
public/
├── images/
│   └── hero-product.webp     # Main product hero image
├── mineralcraft-preview.jpg  # Fallback/preview image
├── favicon.ico
├── logo192.png
└── logo512.png
```

### Adding New Images

#### For Performance & SEO:
1. **Optimize images** before adding:
   - Use WebP format for best compression
   - Compress to <200KB for hero images
   - Use appropriate dimensions (max 1920px width)

2. **Naming Convention**:
   - `hero-[description].webp` - Hero section images
   - `feature-[name].webp` - Feature section images
   - `product-[variant].webp` - Product variations
   - `icon-[name].svg` - UI icons

3. **Folder Structure**:
   ```
   public/images/
   ├── hero/           # Hero section images
   ├── features/       # Feature section images
   ├── products/       # Product variations
   └── icons/          # SVG icons
   ```

#### **Image Update Process:**
1. Add optimized image to appropriate `public/images/` subfolder
2. Update image path in `src/App.tsx`
3. Test locally: `npm start`
4. Commit: `git add . && git commit -m "Update [section] image"`
5. Push: `git push` (auto-deploys in 2-4 minutes)

#### **Image References in Code:**
- **Hero Image**: Line 413 in `src/App.tsx` → `/images/hero/hero-product.webp`
- **Feature Icons**: Lucide React icons (no file references)
- **Background Images**: CSS variables in `src/App.css`

## 📋 Project Governance

### Content Approval Workflow
1. **Copy Changes**: All copy must be approved before deployment
2. **Brand Compliance**: Images must follow brand guidelines
3. **Performance**: All images must be optimized (<200KB)
4. **Testing**: Test on mobile and desktop before deploying

### Repository Management
- **Main Branch**: Production-ready code only
- **Feature Branches**: Use for testing new features
- **Commit Messages**: Use clear, descriptive messages
- **Auto-Deploy**: Pushes to main trigger Netlify deployment

### Quality Checklist
Before any deployment:
- [ ] Copy matches approved content
- [ ] Images are optimized and under 200KB
- [ ] Mobile responsiveness tested
- [ ] All animations work smoothly
- [ ] No console errors
- [ ] Build completes successfully

### Access Control
- **Repository**: Grant access only to approved team members
- **Netlify**: Production deployment access limited to project owners
- **Domain**: DNS settings managed by technical lead

## 🔧 Customization

Key components can be easily customized:

- **Colors**: Update CSS variables in `App.css`
- **Content**: Use the copy reference guide above
- **Animations**: Adjust Framer Motion settings
- **Images**: Replace images in `public/images/` folder

## 🧪 Testing

The landing page includes:

- Responsive design testing
- Animation performance optimization
- Accessibility compliance
- Cross-browser compatibility
- Mobile touch interactions

## 📈 Conversion Elements

1. **Hero Section** - Immediate 20% off offer
2. **Product Features** - 4 key value propositions
3. **Social Proof** - Money-back guarantee
4. **Strategic CTAs** - "Unlock Offer" and "BUY NOW"
5. **Visual Hierarchy** - Premium typography and spacing

## 🎯 Target Audience

- **Mobile-first users** (70%+ traffic)
- **Premium sparkling water enthusiasts**
- **Health-conscious consumers**
- **Sustainability-focused buyers**

## 🔗 Integration

Designed for seamless integration with:

- Meta/Instagram advertising campaigns
- E-commerce checkout flows
- Analytics and conversion tracking
- A/B testing platforms

## 🔍 Analytics & Tracking

### Comprehensive Event Tracking
Every user interaction is tracked for conversion optimization:

- **CTA Clicks**: Hero "TRY IT NOW" and final "BUY NOW" buttons → `https://mineralcraft.co/products/italian-alps-1`
- **Calculator Interactions**: Slider adjustments, brand selections, savings calculations
- **Theme Customization**: Color palette selections and preferences
- **FAQ Engagement**: Question opens/closes and content interaction
- **Section Visibility**: Automatic tracking when users view each section
- **Promotional Banner**: LAUNCH code banner click tracking

### Supported Platforms
- **Google Analytics 4**: Enhanced ecommerce and custom dimensions
- **Facebook Pixel**: Conversion tracking and retargeting audiences  
- **Hotjar**: Heat maps and session recordings (optional)
- **Local Storage**: Backup tracking and debugging support

### Implementation
See **ANALYTICS.md** for complete setup guide with tracking IDs and platform configuration.

## 📚 Additional Documentation

For comprehensive project management:

- **GOVERNANCE.md** - Detailed governance protocols and workflows
- **DEPLOYMENT.md** - Complete deployment guide and troubleshooting
- **ANALYTICS.md** - Complete tracking system and metrics guide
- **.gitignore** - Repository file exclusions
- **package.json** - Dependencies and scripts

## 🚨 Emergency Contacts

For urgent issues:
- **Technical Issues**: Check GitHub Issues first
- **Content Changes**: Use the copy reference guide above
- **Deployment Problems**: Check Netlify deployment logs
- **Detailed Procedures**: See GOVERNANCE.md and DEPLOYMENT.md

---

**Development Server**: http://localhost:3001
**Production Site**: [Your Netlify URL]
**Documentation**: README.md → GOVERNANCE.md → DEPLOYMENT.md
**Last Updated**: September 2024