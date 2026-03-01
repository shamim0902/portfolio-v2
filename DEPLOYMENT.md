# Deployment Guide

This portfolio website can be deployed to various static hosting platforms. Here are the recommended options:

## Quick Deploy Options

### 1. Netlify (Recommended)

**Easiest Option** - Zero configuration required

#### Via Netlify UI
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect Vite and configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy"

#### Via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your site
npm run build

# Deploy
netlify deploy --prod
```

**Custom Domain**: Configure in Netlify Dashboard → Domain settings

**Continuous Deployment**: Enabled by default - every push to main branch triggers a deploy

---

### 2. Vercel

**Best for React Projects**

#### Via Vercel UI
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

#### Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

**Configuration**: No extra config needed for Vite projects

---

### 3. GitHub Pages

**Free hosting on GitHub**

#### Setup
1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/portfolio"
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/portfolio/', // Replace with your repo name
  // ... rest of config
});
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Note**: May take a few minutes to go live

---

### 4. Cloudflare Pages

**Fast global CDN**

#### Via Cloudflare Dashboard
1. Push code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Create a new project
4. Connect your GitHub repository
5. Configure build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Deploy

**Custom Domain**: Free SSL and custom domain support

---

## Build Configuration

### Environment Variables

If you need environment variables, create `.env` file:

```env
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

Add to your hosting platform:
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment variables
- **Cloudflare**: Settings → Environment variables

### Production Build

Always test production build locally:

```bash
# Build
npm run build

# Preview production build
npx vite preview
```

## Performance Optimization

### Before Deploy Checklist

- [ ] Run production build
- [ ] Test all routes
- [ ] Check mobile responsiveness
- [ ] Test print/PDF export on /resume
- [ ] Verify all links work
- [ ] Test command palette (Cmd+K)
- [ ] Check 3D performance
- [ ] Test on multiple browsers
- [ ] Lighthouse audit (aim for 90+)

### Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-site.com --view
```

Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## Custom Domain Setup

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### GitHub Pages
1. Add `CNAME` file to `/public` directory with your domain
2. Update DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

## SSL/HTTPS

All recommended platforms provide **free SSL certificates automatically**:
- Netlify: Auto-provisioned Let's Encrypt
- Vercel: Auto-provisioned Let's Encrypt
- Cloudflare: Built-in SSL
- GitHub Pages: Auto-provisioned

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get tracking ID from Google Analytics
2. Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Netlify Analytics

Built-in analytics available on paid plans:
- Page views
- Unique visitors
- Top pages
- Traffic sources

## Troubleshooting

### 404 on Refresh

**Problem**: Page not found when refreshing on non-root routes

**Solution**: Add redirect rules

**Netlify** - Create `public/_redirects`:
```
/* /index.html 200
```

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**GitHub Pages** - Create `public/404.html` (copy of index.html)

### Build Failures

**Check**:
- Node version (use Node 18+)
- All dependencies installed
- No TypeScript errors
- Environment variables set

**Common fixes**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist .vite
npm run build
```

## Cost Comparison

| Platform | Free Tier | Bandwidth | Build Minutes |
|----------|-----------|-----------|---------------|
| **Netlify** | ✅ Yes | 100GB/mo | 300 min/mo |
| **Vercel** | ✅ Yes | 100GB/mo | 6000 min/mo |
| **GitHub Pages** | ✅ Yes | 100GB/mo | Unlimited |
| **Cloudflare** | ✅ Yes | Unlimited | 500 builds/mo |

All free tiers are more than sufficient for a portfolio site.

## Recommended Setup

For this portfolio, we recommend:

1. **Primary**: Netlify or Vercel
   - Easy setup
   - Automatic deployments
   - Great developer experience
   
2. **Custom Domain**: Your own domain
   - More professional
   - Better for SEO
   
3. **Analytics**: Netlify Analytics or Google Analytics
   - Track visitors
   - Monitor performance

## Post-Deployment

After deploying:

1. ✅ Test all features
2. ✅ Verify custom domain works
3. ✅ Check SSL certificate
4. ✅ Run Lighthouse audit
5. ✅ Test on mobile devices
6. ✅ Share on social media
7. ✅ Add to LinkedIn/resume
8. ✅ Submit to search engines

---

Need help? Check the platform-specific documentation:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
