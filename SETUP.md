# Setup Guide

Quick guide to get the portfolio running on your local machine.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- Git (optional, for version control)

### Check Your Setup

```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 8.x or higher
```

---

## Installation

### 1. Download/Clone the Project

If using Git:
```bash
git clone <repository-url>
cd portfolio
```

Or download and extract the ZIP file.

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~300MB). Takes 1-3 minutes depending on your internet speed.

### 3. Start Development Server

```bash
npm run dev
```

The site will open at `http://localhost:5173`

**Hot Reload**: Changes you make will instantly appear in the browser!

---

## First Steps

### Update Your Information

1. Open `/src/data/portfolio.json`
2. Update with your details:
   - name
   - title
   - email
   - location
   - etc.

3. Save the file
4. The browser will auto-refresh with your changes!

See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for detailed customization guide.

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   └── utils/           # Utilities
│   ├── data/
│   │   └── portfolio.json   # Your content (EDIT THIS!)
│   └── styles/              # Global styles
├── public/                  # Static assets
├── package.json             # Dependencies
└── vite.config.ts          # Build configuration
```

---

## Development Commands

### Start Dev Server
```bash
npm run dev
```
- Starts local server at http://localhost:5173
- Hot reload enabled
- Source maps for debugging

### Build for Production
```bash
npm run build
```
- Creates optimized build in `/dist` folder
- Minifies code
- Optimizes assets
- Ready to deploy

### Preview Production Build
```bash
npm run build
npx vite preview
```
- Test production build locally
- Preview at http://localhost:4173

---

## IDE Setup (VS Code)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - Quick React snippets

2. **Tailwind CSS IntelliSense**
   - Autocomplete for Tailwind classes

3. **TypeScript Vue Plugin (Volar)**
   - Better TypeScript support

4. **Prettier**
   - Code formatting

### Install Extensions

```bash
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## Troubleshooting

### Port Already in Use

If port 5173 is taken:

```bash
# Option 1: Kill process on port
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Option 2: Use different port
npm run dev -- --port 3000
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear build cache
rm -rf dist .vite
npm run build
```

### TypeScript Errors

```bash
# Check TypeScript
npx tsc --noEmit
```

### Slow Performance in Development

- Close other applications
- Clear browser cache
- Restart dev server
- Check if antivirus is scanning node_modules

---

## Environment Variables

Create `.env.local` file in root (optional):

```env
# Example environment variables
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note**: 
- Must prefix with `VITE_`
- Restart dev server after changes
- Never commit secrets to Git

---

## Git Setup (Optional)

### Initialize Repository

```bash
git init
git add .
git commit -m "Initial commit"
```

### Create .gitignore

Already included:
```
node_modules/
dist/
.env.local
.DS_Store
*.log
```

### Push to GitHub

```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

---

## Browser DevTools

### React DevTools

Install browser extension:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Performance Monitoring

Open browser DevTools (F12):

1. **Network Tab**: Check load times
2. **Performance Tab**: Profile animations
3. **Lighthouse**: Audit site performance

Run Lighthouse:
1. Open DevTools
2. Go to Lighthouse tab
3. Click "Generate report"
4. Aim for 90+ scores

---

## Common Development Workflow

### Making Changes

1. Edit files in `/src`
2. Browser auto-refreshes
3. Check for console errors
4. Test on different screen sizes

### Adding New Feature

1. Create component in `/src/app/components`
2. Import in relevant page
3. Test functionality
4. Update documentation

### Before Committing

```bash
# Build test
npm run build

# Check for errors
npx tsc --noEmit

# Commit
git add .
git commit -m "Description of changes"
```

---

## Performance Tips

### Development Mode

- **Slow?** Reduce 3D particle count temporarily
- **Hot reload issues?** Restart dev server
- **Console spam?** Check for infinite loops

### Production Mode

Always test production build before deploying:

```bash
npm run build
npx vite preview
```

Check:
- ✅ All routes work
- ✅ Images load
- ✅ 3D renders
- ✅ Animations smooth
- ✅ Mobile responsive

---

## Getting Help

### Documentation
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com)

### Common Issues
- Check console for errors
- Search error messages on Google
- Check GitHub Issues (if using open source)

### Project-Specific Help
- See [CUSTOMIZATION.md](./CUSTOMIZATION.md) for content changes
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

---

## Next Steps

1. ✅ Update `/src/data/portfolio.json` with your info
2. ✅ Test all sections
3. ✅ Customize colors/fonts (optional)
4. ✅ Add your projects
5. ✅ Build and preview
6. ✅ Deploy to hosting platform
7. ✅ Share with the world!

Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Happy coding! 🚀**
