# Customization Guide

This guide will help you customize the portfolio to make it your own.

## Quick Start - Update Your Information

### 1. Personal Information (5 minutes)

Edit `/src/data/portfolio.json`:

```json
{
  "name": "Your Name",
  "title": "Your Job Title",
  "location": "Your City, Country",
  "email": "your.email@example.com",
  "phone": "+1234567890",
  "tagline": "Your professional tagline",
  "about": "Your professional summary..."
}
```

**That's it!** The entire site will update automatically.

---

## Content Customization

### Update Skills

In `portfolio.json`:

```json
{
  "skills": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    // Add your skills here
  ]
}
```

Skills appear in:
- About section (as tags)
- Resume page

---

### Update Projects

Add/edit projects in `portfolio.json`:

```json
{
  "projects": [
    {
      "id": "unique-id",
      "title": "Project Name",
      "type": "Web App | Mobile App | WordPress Plugin | etc",
      "description": "Detailed project description",
      "tags": ["React", "Node.js", "AWS"],
      "featured": true,  // Shows on home page and resume
      "year": "2024",
      "link": "https://project-url.com"  // or null if no link
    }
  ]
}
```

**Features**:
- `featured: true` projects appear on home page
- All projects appear on resume
- Searchable by title, description, and tags
- Filterable by type

---

### Update Experience

Add your work history:

```json
{
  "experience": [
    {
      "role": "Your Job Title",
      "company": "Company Name",
      "period": "2023 - Present",
      "description": "Brief description of responsibilities and achievements"
    }
  ]
}
```

Appears on:
- Resume page only

---

### Update Social Links

```json
{
  "links": {
    "website": "https://your-site.com",
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "facebook": "https://facebook.com/yourprofile",
    "twitter": "https://twitter.com/yourhandle",
    "wordpress": "https://profiles.wordpress.org/username",
    "mentorship": "https://adplist.org/mentors/yourname"
  }
}
```

Links appear in:
- Footer
- Contact section
- Command palette
- Resume page

---

### Update Countries Visited

```json
{
  "countriesVisited": [
    "United States",
    "Canada",
    "Mexico",
    // Add countries you've visited
  ]
}
```

**Note**: Use official country names for best results.

---

## Visual Customization

### Change Primary Color

The site uses cyan (`#06b6d4`) as the primary color. To change:

**Option 1: Quick Replace**

Find and replace in all files:
- `cyan-500` → `purple-500` (or any Tailwind color)
- `#06b6d4` → `#your-hex-color`
- `#0891b2` → `#your-darker-shade`
- `#22d3ee` → `#your-lighter-shade`

**Option 2: Custom Color**

Add to `/src/styles/theme.css`:

```css
:root {
  --primary-color: #your-color;
  --primary-dark: #darker-shade;
  --primary-light: #lighter-shade;
}
```

Then use in Tailwind:
```tsx
className="bg-[var(--primary-color)]"
```

---

### Customize Fonts

1. Import fonts in `/src/styles/fonts.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
```

2. Update Tailwind config (if needed) or use directly:

```tsx
className="font-['Inter']"
```

---

### Adjust Spacing

All sections use Tailwind spacing. Common adjustments:

**Section Padding**:
```tsx
// Current: py-32
// Smaller: py-24
// Larger: py-40
```

**Container Width**:
```tsx
// Current: max-w-6xl or max-w-7xl
// Smaller: max-w-5xl
// Larger: max-w-[1600px]
```

---

## Advanced Customization

### Add New Section

1. Create component in `/src/app/components/sections/`:

```tsx
// NewSection.tsx
export function NewSection() {
  return (
    <section id="new-section" className="py-32 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8">
          New Section
        </h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

2. Import in `/src/app/pages/Home.tsx`:

```tsx
import { NewSection } from '../components/sections/NewSection';

// Add to main:
<main>
  <HeroSection />
  <AboutSection />
  <NewSection /> {/* Add here */}
  <ProjectsSection />
  {/* ... */}
</main>
```

3. Add navigation link in `/src/app/components/shared/Navigation.tsx`:

```tsx
const navItems = [
  { label: 'About', href: '#about' },
  { label: 'New Section', href: '#new-section' }, // Add here
  // ...
];
```

---

### Modify 3D Orb

Edit `/src/app/components/three/TechOrb.tsx`:

**Change Color**:
```tsx
<MeshDistortMaterial
  color="#your-color"  // Main color
  emissive="#darker-shade"  // Glow color
  emissiveIntensity={0.5}  // Glow strength
/>
```

**Adjust Animation**:
```tsx
// Rotation speed
meshRef.current.rotation.y += 0.002; // Slower: 0.001, Faster: 0.005

// Mouse sensitivity
const targetRotationX = mousePosition.y * 0.3; // Less: 0.2, More: 0.5
```

**Particle Count**:
```tsx
const count = 1000; // More: 2000, Less: 500
```

---

### Disable 3D Hero

If you want a simpler hero without 3D:

In `/src/app/components/sections/HeroSection.tsx`:

```tsx
// Remove or comment out:
{!prefersReducedMotion && (
  <div className="absolute inset-0 opacity-80">
    <Canvas ...>
      ...
    </Canvas>
  </div>
)}

// Keep only the gradient:
<div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
```

---

### Add Blog Section

1. Create blog posts data structure in `portfolio.json`:

```json
{
  "blogPosts": [
    {
      "id": "1",
      "title": "Post Title",
      "excerpt": "Brief description",
      "date": "2024-01-15",
      "link": "https://medium.com/@you/post"
    }
  ]
}
```

2. Create `BlogSection.tsx` component (similar to ProjectsSection)

3. Add to Home page

---

### Customize Resume Layout

Edit `/src/app/pages/Resume.tsx`:

**Change Order**:
Move sections around in the JSX structure

**Add Section**:
```tsx
<section className="mb-8">
  <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2">
    Certifications
  </h3>
  {/* Your content */}
</section>
```

**Adjust Spacing**:
```tsx
// Section spacing
className="mb-8"  // Current
className="mb-6"  // Tighter
className="mb-12" // Looser
```

---

## Component Customization

### Navigation Bar

In `/src/app/components/shared/Navigation.tsx`:

**Change Logo**:
```tsx
<Link to="/" className="text-2xl font-bold">
  Your Name  {/* Replace "H." */}
</Link>
```

**Add/Remove Links**:
```tsx
const navItems = [
  { label: 'About', href: '#about' },
  // Add more items
];
```

---

### Footer

In `/src/app/components/shared/Footer.tsx`:

**Update Content**:
```tsx
<p className="text-gray-400">
  Your tagline or quote
</p>
```

**Add Links**:
```tsx
<a href="/blog">Blog</a>
<a href="/privacy">Privacy</a>
```

---

### Command Palette

In `/src/app/components/command/CommandPalette.tsx`:

**Add Commands**:
```tsx
<CommandGroup heading="Actions">
  <CommandItem onSelect={() => /* your action */}>
    <Icon className="mr-2 h-4 w-4" />
    <span>Your Command</span>
  </CommandItem>
</CommandGroup>
```

---

## SEO Customization

### Update Meta Tags

Create `/public/index.html` or edit if exists:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>Your Name - Your Title</title>
  <meta name="title" content="Your Name - Your Title">
  <meta name="description" content="Your professional description">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yoursite.com/">
  <meta property="og:title" content="Your Name - Your Title">
  <meta property="og:description" content="Your professional description">
  <meta property="og:image" content="https://yoursite.com/preview.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yoursite.com/">
  <meta property="twitter:title" content="Your Name - Your Title">
  <meta property="twitter:description" content="Your professional description">
  <meta property="twitter:image" content="https://yoursite.com/preview.jpg">
  
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## Performance Tuning

### Reduce Initial Load

**Lazy Load More Sections**:
```tsx
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'));
```

### Optimize 3D Performance

**Lower DPR**:
```tsx
<Canvas dpr={1}> {/* Instead of Math.min(window.devicePixelRatio, 2) */}
```

**Reduce Particles**:
```tsx
const count = 500; // Instead of 1000
```

---

## Testing Changes

After customization:

1. **Local Test**:
```bash
npm run dev
```

2. **Build Test**:
```bash
npm run build
npm run preview
```

3. **Verify**:
- ✅ All sections load
- ✅ Navigation works
- ✅ Mobile responsive
- ✅ Resume prints correctly
- ✅ Command palette works
- ✅ No console errors

---

## Common Customizations Checklist

- [ ] Update personal info in portfolio.json
- [ ] Add your projects
- [ ] Update skills list
- [ ] Add work experience
- [ ] Update social links
- [ ] Customize colors (optional)
- [ ] Add your profile photo (optional)
- [ ] Update meta tags for SEO
- [ ] Add favicon
- [ ] Test all features
- [ ] Deploy!

---

Need help? Check:
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GSAP Docs](https://greensock.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
