# Premium Portfolio Website - Hasanuzzaman

A highly unique, production-ready portfolio website built with React, TypeScript, and modern web technologies. Features interactive 3D elements, smooth animations, and a clean glassmorphic design.

> 🎨 **Live Demo**: Deploy and add your URL here  
> 📖 **Full Documentation**: See below for all guides

---

## ✨ Features

### Visual & Interactive
- **3D Hero Section** - Interactive tech orb using React Three Fiber with mouse tracking
- **GSAP Animations** - Smooth scroll-triggered animations with ScrollTrigger
- **Glassmorphism UI** - Modern frosted glass aesthetic with backdrop blur
- **Dark Theme** - Elegant dark-first design with optional light mode
- **Micro-interactions** - Magnetic buttons, hover effects, and smooth transitions
- **Command Palette** - Quick navigation with Cmd/Ctrl+K

### Sections
- **Hero** - Eye-catching 3D animated introduction
- **About** - Professional summary, career journey, and technical skills
- **Projects** - Searchable and filterable project showcase with modal details
- **Travel** - Interactive countries visited visualization
- **Contact** - Social links with copy-to-clipboard functionality

### Technical
- **React Router** - Multi-page navigation with dedicated resume route
- **Code Splitting** - Lazy loading for optimal performance
- **Accessibility** - Keyboard navigation, ARIA labels, reduced motion support
- **Responsive** - Mobile-first design that works on all devices
- **Print-Friendly Resume** - Professional A4 layout for PDF export
- **JSON-Driven** - All content from single data source

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── command/         # Command palette
│   │   ├── sections/        # Page sections (Hero, About, Projects, etc.)
│   │   ├── shared/          # Reusable components (Navigation, Footer)
│   │   ├── three/           # 3D components
│   │   ├── ui/              # UI component library
│   │   └── visualizations/  # Data visualizations
│   ├── pages/               # Route pages (Home, Resume)
│   ├── utils/               # Utility functions
│   └── routes.tsx           # Route configuration
├── data/
│   └── portfolio.json       # Content data (single source of truth)
└── styles/                  # Global styles
```

## 🎨 Design System

- **Primary Color**: Cyan (#06b6d4)
- **Typography**: System fonts with Tailwind defaults
- **Spacing**: Tailwind spacing scale
- **Animations**: GSAP + Motion for smooth, performant animations

## 🎯 Key Technologies

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Utility-first styling
- **React Three Fiber** - 3D graphics with Three.js
- **GSAP** - Professional-grade animations
- **D3** - Data visualizations
- **React Router** - Client-side routing
- **Motion** - Declarative animations
- **Vite** - Fast build tool

## ⚡ Performance Features

- Lazy loading of heavy sections
- Code splitting by route
- Optimized 3D rendering (limited DPR)
- Reduced motion support
- Efficient scroll animations
- Suspense boundaries

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip-to-content link
- Focus visible states
- Reduced motion preference detection
- Screen reader friendly

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interactions
- Adaptive layouts
- Responsive typography

## 🎨 Customization

To customize the portfolio content, edit `/src/data/portfolio.json`:

- Personal information (name, title, email, etc.)
- About section text
- Career roles and experience
- Skills list
- Projects with tags and descriptions
- Countries visited
- Social media links

## 🖨️ Resume/PDF Export

Visit `/resume` to access the printable resume. Use your browser's print function (Cmd/Ctrl+P) to save as PDF.

## 🔧 Development Tools

- ESLint - Code linting
- TypeScript - Type checking
- Vite - Hot module replacement

## 📝 License

This is a personal portfolio project. Feel free to use the code structure and design patterns for inspiration.

## 👤 Contact

- **Email**: hasanuzzamanbe@gmail.com
- **Website**: https://hasanuzzaman.com
- **GitHub**: https://github.com/hasanuzzamanbe
- **LinkedIn**: https://www.linkedin.com/in/shamim0902

---

Built with ❤️ by Hasanuzzaman