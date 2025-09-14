# MINERALCRAFT Landing Page - Deployment Guide

## 🚀 Quick Deployment

### Automatic (Recommended)
1. **Push to main branch** → Auto-deploys to Netlify in 2-4 minutes
2. **Monitor build** → Check Netlify dashboard for deployment status
3. **Verify live site** → Test key functionality post-deployment

### Manual (Emergency)
```bash
# Build production version
npm run build

# Deploy via Netlify CLI
netlify deploy --prod --dir=build

# Or deploy specific build
netlify deploy --prod --dir=build --message "Emergency hotfix"
```

## 🔧 Environment Setup

### Initial Setup (One-time)
```bash
# Install dependencies
npm install

# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify (if not already done)
netlify login

# Link to existing Netlify site
netlify link
```

### Environment Variables
Current `.env` configuration:
```
GENERATE_SOURCEMAP=false
CI=false
```

**For additional environments:**
- `REACT_APP_*` variables for runtime config
- Add to Netlify dashboard → Site settings → Environment variables

## 📦 Build Process

### Production Build
```bash
npm run build
```

**Build outputs:**
- `build/` folder contains optimized production files
- Static assets compressed and minified
- Source maps disabled for security
- Bundle analysis available via `npm run build -- --analyze`

### Build Optimization
- **Code splitting** automatically enabled
- **Image optimization** via WebP format
- **CSS optimization** with autoprefixer
- **Bundle size analysis** built-in

### Build Troubleshooting
Common issues and fixes:

**ESLint Warnings:**
```bash
# Fix automatically
npm run lint:fix

# Or disable for deployment
echo "CI=false" >> .env
```

**Memory Issues:**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**TypeScript Errors:**
```bash
# Check types without building
npm run type-check

# Build with type checking disabled
npm run build:no-typecheck
```

## 🌐 Netlify Configuration

### Site Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18.x (specified in `.nvmrc`)
- **Build Timeout**: 15 minutes

### Deploy Previews
- **Pull Requests**: Auto-generate preview URLs
- **Branch Deploys**: Enable for staging branches
- **Deploy Notifications**: Configure Slack/email alerts

### Custom Domains
```bash
# Add custom domain via CLI
netlify domains:add yourdomain.com

# Or via dashboard → Domain management → Add custom domain
```

### SSL/HTTPS
- **Auto-SSL**: Enabled by default for .netlify.app domains
- **Custom SSL**: Auto-provisioned for custom domains
- **HTTPS Redirect**: Forced for all traffic

## 📊 Performance Monitoring

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms  
- **CLS (Cumulative Layout Shift)**: <0.1

### Monitoring Tools
- **Netlify Analytics**: Built-in performance tracking
- **Google PageSpeed**: Monitor Core Web Vitals
- **GTmetrix**: Comprehensive performance analysis
- **Lighthouse**: Built into Chrome DevTools

### Performance Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Check for unused dependencies
npm audit

# Optimize images
# Use WebP format, compress to <200KB
```

## 🔄 Rollback Procedures

### Quick Rollback (Via Netlify Dashboard)
1. Go to Netlify dashboard → Deploys
2. Find last known good deployment
3. Click "Publish deploy" to rollback instantly

### Rollback via CLI
```bash
# List recent deployments
netlify api listSiteDeploys

# Restore specific deployment
netlify api restoreSiteDeploy --deploy-id=DEPLOY_ID
```

### Git-based Rollback
```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard COMMIT_HASH

# Force push (use with caution)
git push --force
```

## 🧪 Testing Before Deployment

### Local Testing Checklist
- [ ] `npm start` → Test development server
- [ ] `npm run build` → Verify production build
- [ ] `serve -s build` → Test production bundle locally
- [ ] Mobile responsiveness check
- [ ] Cross-browser compatibility

### Staging Environment
```bash
# Deploy to staging branch
git checkout staging
git merge main
git push origin staging

# Or deploy preview
netlify deploy --dir=build
```

### Pre-deployment Tests
```bash
# Run all tests (if configured)
npm test

# Type checking
npm run type-check

# Lint checking  
npm run lint

# Build verification
npm run build
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Content reviewed and approved
- [ ] Images optimized (<200KB each)
- [ ] Local testing completed
- [ ] Mobile responsiveness verified
- [ ] No console errors in dev tools
- [ ] Build completes without warnings

### During Deployment
- [ ] Monitor Netlify build logs
- [ ] Check deployment status
- [ ] Verify build completion

### Post-Deployment
- [ ] Test live site functionality
- [ ] Verify image loading
- [ ] Check mobile performance
- [ ] Test calculator functionality
- [ ] Verify analytics tracking
- [ ] Monitor error logs

## 🚨 Emergency Procedures

### Site Down
1. **Check Netlify Status**: status.netlify.com
2. **Immediate Rollback**: Use last known good deploy
3. **DNS Issues**: Verify domain settings
4. **Contact Support**: If infrastructure issue

### Performance Issues
1. **Check Recent Changes**: Review last deployment
2. **Image Optimization**: Verify image sizes
3. **Bundle Analysis**: Check for code bloat
4. **CDN Cache**: Clear Netlify edge cache

### Content Issues
1. **Quick Fix**: Use README line references
2. **Emergency Content**: Rollback to previous version
3. **Mobile Issues**: Priority fix for mobile users

## 📞 Support Contacts

### Technical Issues
- **Netlify Support**: support@netlify.com
- **Documentation**: docs.netlify.com
- **Community**: community.netlify.com

### Internal Contacts
- **Technical Lead**: [Add contact info]
- **Content Manager**: [Add contact info]
- **Project Owner**: [Add contact info]

---

**Last Updated**: September 2024
**Netlify Site ID**: [Add your site ID]
**Production URL**: [Add your live site URL]