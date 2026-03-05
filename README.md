# Portfolio v2
https://www.hasanuzzaman.com

A modern, full-viewport slide-based portfolio built with Vue 3, Vite, and GSAP.

## Tech Stack

- **Framework:** Vue 3
- **Build Tool:** Vite
- **Animations:** GSAP + ScrollTrigger
- **Icons:** Lucide Vue Next
- **Styling:** CSS Custom Properties (Dark/Light theme)
- **Fonts:** Instrument Serif + Inter
- **Hosting:** Firebase

## Project Setup

```
npm install
```

### Development

```
npm run dev
```

### Build for Production

```
npm run build
```

### Preview Production Build

```
npm run preview
```

## Deploy to Firebase

### First Time Setup

1. Install Firebase CLI (if not installed):
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Build the project:
   ```
   npm run build
   ```

4. Deploy:
   ```
   firebase deploy
   ```

### Subsequent Deploys

```
npm run build
firebase deploy
```

### CI/CD (GitHub Actions)

Deployments are automated via GitHub Actions:

- **Push to `master`** — automatically builds and deploys to live site
- **Pull requests** — automatically builds and deploys a preview URL

**Required:** Add `FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_EED2F` secret in your GitHub repo settings (Settings > Secrets and variables > Actions).

## Project Structure

```
src/
├── components/
│   ├── AppHeader.vue        # Fixed nav bar + theme toggle
│   ├── SlideNav.vue         # Side dot navigation
│   ├── HeroSlide.vue        # Hero section with profile image
│   ├── AboutSlide.vue       # About me + roles
│   ├── ExperienceSlide.vue  # Work experience timeline
│   ├── SkillsSlide.vue      # Technology tags
│   ├── ProjectsSlide.vue    # Projects list + GitHub stats
│   ├── TravelSlide.vue      # Travel gallery + countries
│   └── ContactSlide.vue     # Contact info + social links
├── assets/
│   └── styles.css           # Global styles + theme variables
├── App.vue                  # Root component + GSAP animations
└── main.js                  # Vue app entry point
```


### For me to deploy firebase:
step 1. run `npm run build`

step 2. run `firebase login` (if not logged in )

step 3. run `firebase init`

step 4: Select firebase hosting by changing with down arrow and select with space button.

step 5: set directory as `dist`

step 6: configure as single page app `No`

step 7: just check the `firebase.json` file and if not then add this script on the hosting object
        
        ,"rewrites": [{
        "source": "**",
        "destination": "/index.html"
         }]

step 8: run `firebase deploy`

All done check your live project :) 
