# MINERALCRAFT Landing Page - Governance Guide

## 📋 Content Management Protocol

### Copy Updates (Content Writers)

**Before Making Changes:**
- [ ] Identify exact content sections using README.md line references
- [ ] Prepare approved copy in advance
- [ ] Test content length doesn't break responsive design

**Making Changes:**
1. Edit `src/App.tsx`
2. Locate line numbers from README.md reference guide
3. Update text between quotes (preserve exact formatting)
4. Test locally: `npm start` → http://localhost:3001
5. Verify on mobile and desktop
6. Commit: `git add . && git commit -m "Update: [section] copy"`
7. Push: `git push` (triggers auto-deployment in 2-4 minutes)

**Post-Deployment:**
- [ ] Verify live site reflects changes
- [ ] Test mobile responsiveness
- [ ] Check conversion tracking still works

### Image Updates (Design Team)

**Image Optimization Requirements:**
- Format: WebP (preferred) or optimized JPG/PNG
- File size: <200KB for hero images, <100KB for features
- Dimensions: Max 1920px width, responsive heights
- Quality: 80-85% compression ratio

**Folder Structure:**
```
public/images/
├── hero/           # Main hero section images
├── features/       # Feature section visuals  
├── products/       # Product variation images
└── icons/          # SVG icons and graphics
```

**Update Process:**
1. Optimize image using compression tool
2. Add to appropriate `public/images/` subfolder
3. Update image path in `src/App.tsx` (see README line references)
4. Test locally for loading speed and quality
5. Commit: `git add . && git commit -m "Update: [section] image"`
6. Push: `git push`

**Current Image References:**
- Hero Image: Line 308 in `src/App.tsx` → `/images/hero/hero-product.webp`
- Feature Icons: Lucide React components (no files needed)

## 🚀 Deployment Workflow

### Automatic Deployment (Netlify)
- **Trigger**: Push to main branch
- **Build Time**: ~2-4 minutes
- **Build Command**: `npm run build`
- **Deploy Directory**: `build/`

### Manual Deployment (Emergency)
```bash
# Build locally
npm run build

# Deploy via Netlify CLI
netlify deploy --prod --dir=build
```

### Pre-Deployment Checklist
- [ ] All content approved by stakeholders
- [ ] Images optimized and under size limits
- [ ] Local testing completed (mobile + desktop)
- [ ] No console errors in browser dev tools
- [ ] Build completes without warnings
- [ ] Animations perform smoothly

## 🔐 Access Control & Permissions

### Repository Access (GitHub)
- **Admin**: Project owner/technical lead
- **Write**: Content managers, approved developers
- **Read**: Stakeholders, reviewers

### Deployment Access (Netlify)
- **Owner**: Project owner only
- **Collaborator**: Technical lead
- **Viewer**: Content team (monitoring only)

### Branch Protection Rules
- **Main Branch**: Protected, requires review
- **Feature Branches**: Open for development
- **Direct Push**: Disabled on main

## 📊 Quality Assurance

### Pre-Launch Testing
1. **Cross-Browser**: Chrome, Safari, Firefox, Edge
2. **Device Testing**: iPhone, Android, Tablet, Desktop
3. **Performance**: Page load under 3 seconds
4. **Animations**: Smooth 60fps performance
5. **Accessibility**: Screen reader compatibility

### Performance Monitoring
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Mobile Speed**: Target 90+ PageSpeed score
- **Image Optimization**: All images under recommended limits
- **Bundle Size**: Monitor for bloat, keep under 1MB

### Analytics Integration
- Track conversion funnel from hero → features → CTA
- Monitor mobile vs desktop performance
- A/B test different copy variations
- Heat mapping on key interactive elements

## 🚨 Emergency Procedures

### Rollback Process
1. Identify problematic deployment in Netlify
2. Use "Rollback to this deploy" for immediate fix
3. Fix issues in codebase
4. Redeploy when ready

### Critical Issues
- **Site Down**: Check Netlify status, contact technical lead
- **Performance Issues**: Review recent image additions
- **Content Errors**: Use README line references for quick fixes
- **Mobile Issues**: Priority fix - test on actual devices

### Contact Escalation
1. **Content Issues**: Content manager → Project owner
2. **Technical Issues**: Developer → Technical lead
3. **Deployment Issues**: Technical lead → Netlify support

## 📈 Content Strategy Guidelines

### Brand Voice & Tone
- **Premium but approachable** language
- **Benefits-focused** messaging (not feature-heavy)
- **Urgency without pressure** - gentle prompts to action
- **Sustainable luxury** positioning

### Copy Testing Framework
- **A/B Test Headlines**: Hero section, CTA buttons
- **Monitor Conversions**: Track changes in conversion rates
- **User Feedback**: Collect and analyze user responses
- **Performance Impact**: Monitor page speed after copy changes

### Seasonal Updates
- **Quarterly Reviews**: Refresh promotional messaging
- **Holiday Campaigns**: Update banners and CTAs
- **Seasonal Colors**: Test alternative brand palettes
- **Mobile Optimization**: Prioritize mobile user experience

## 🔄 Maintenance Schedule

### Weekly
- [ ] Monitor site performance metrics
- [ ] Review deployment logs for errors
- [ ] Check mobile loading speeds

### Monthly  
- [ ] Update dependencies if needed
- [ ] Review and optimize image sizes
- [ ] Test all interactive elements
- [ ] Backup current codebase

### Quarterly
- [ ] Comprehensive cross-device testing  
- [ ] Performance audit and optimization
- [ ] Content strategy review
- [ ] Analytics and conversion analysis

---

**Last Updated**: September 2024
**Version**: 1.0
**Next Review**: December 2024