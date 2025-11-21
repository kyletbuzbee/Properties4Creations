# 🎨 Professional Website Asset Strategy
## Complete Visual Audit & Implementation Plan

---

## 📊 CURRENT STATE ANALYSIS

### Existing Assets (4 files)
```
/web/public/images/
├── patio_wood.jpg              (Background texture - 10% opacity overlay)
├── projects_patio_wood1.jpg    (Project photo)
├── project1.svg                (Project placeholder SVG)
└── logo/
    └── logo.png                (Company logo only)
```

### Asset Gap Analysis
| Category | Current | Needed | Priority |
|----------|---------|--------|----------|
| Hero Images | 0 | 4 | 🔴 CRITICAL |
| Project Showcase | 1 | 15+ | 🔴 CRITICAL |
| Icons (UI Set) | 0 | 12+ | 🟠 HIGH |
| Testimonial Avatars | 0 | 4-5 | 🟠 HIGH |
| Team Photos | 0 | 4-6 | 🟡 MEDIUM |
| Background Patterns | 1 | 3 | 🟡 MEDIUM |
| SVG Illustrations | 0 | 3-4 | 🟢 LOW |

**Total asset deficit: ~45-60 professional images/icons needed**

---

## 🎯 DETAILED ASSET REQUIREMENTS BY PAGE

### 1. HOME PAGE (ModernHero.tsx & page.tsx)
**Current State:** Text-only with color gradients, texture overlay
**Missing Visuals:** Hero imagery, section dividers

#### Required Assets:
```
HERO IMAGES (1920×1080px minimum):
├── seller-hero.jpg          (Left side: Property donor/investor narrative)
│   └── Description: Restored home, warm lighting, hope-focused
│   └── Emotion: Generosity, transformation, legacy
│   
├── renter-hero.jpg          (Right side: Affordable housing narrative)
│   └── Description: Happy diverse family in new home, move-in day
│   └── Emotion: Fresh start, stability, belonging
│
├── veteran-hero.jpg         (Alternate: Hero for Section 8/Veteran focus)
│   └── Description: Veteran in restored home, peaceful/content
│   └── Emotion: Honor, gratitude, earned dignity
│
└── community-hero.jpg       (Alternate: Community focus)
    └── Description: Multiple families, neighborhood feel
    └── Emotion: Community, support, connection

SUPPORTING GRAPHICS:
├── divider-wave-1.svg       (Section separator - clean wave)
├── divider-wave-2.svg       (Variant for different sections)
└── accent-shapes.svg        (Subtle geometric accents)
```

**Where Used in Code:**
- `ModernHero.tsx` - Replace texture overlay with actual hero image
- Section 8 badge area - Add complementary imagery
- Background patterns - Subtle texture behind text

---

### 2. PROJECTS PAGE (projects/page.tsx + ProjectCard.tsx)
**Current State:** Grid with placeholder images (h-64 = 256px height)
**Missing Visuals:** Before/after photos, property showcase images, neighborhood context

#### Required Assets (HIGH PRIORITY):
```
BEFORE & AFTER TRANSFORMATIONS (4-5 pairs):
Before/After/property-1/
├── before.jpg               (800×600px - Original condition)
├── after.jpg                (800×600px - Restored condition)
└── progress-photos/         (Optional: 2-3 mid-renovation photos)

Before/After/property-2/
├── before.jpg
└── after.jpg

Before/After/property-3/
├── before.jpg
└── after.jpg

Before/After/property-4/
├── before.jpg
└── after.jpg

Before/After/property-5/
├── before.jpg
└── after.jpg

PROPERTY TYPE SHOWCASE (Used as cards when Firebase has no image):
property-types/
├── 1-bedroom-modern.jpg     (400×300px - Contemporary apartment)
├── 2-bedroom-family.jpg     (400×300px - Family-sized home)
├── 3-bedroom-spacious.jpg   (400×300px - Larger home)
├── accessible-home.jpg      (400×300px - Accessible/adapted unit)
├── urban-efficiency.jpg     (400×300px - Compact urban unit)
└── suburban-comfort.jpg     (400×300px - Suburban home feel)

NEIGHBORHOOD & CONTEXT (600×400px):
neighborhood/
├── street-community.jpg     (Walkable neighborhood street)
├── park-access.jpg          (Community park/recreation)
├── transit-accessible.jpg   (Public transportation nearby)
├── local-amenities.jpg      (Shopping, services nearby)
└── diverse-community.jpg    (Multi-generational neighborhood)

DETAIL SHOTS (for detail view/carousel):
details/
├── kitchen-modern.jpg       (500×400px - Modern kitchen renovation)
├── bathroom-accessible.jpg  (500×400px - Accessible bathroom)
├── flooring-quality.jpg     (500×400px - Premium flooring)
├── energy-efficient.jpg     (500×400px - HVAC/efficiency features)
└── outdoor-space.jpg        (500×400px - Patio/yard/outdoor)
```

**ProjectCard.tsx uses:**
- `featured_image_url` or `after_image_url` (displayed at h-64: 256px height)
- Falls back to property type images if not provided
- Image with smooth animation on hover

---

### 3. TESTIMONIALS & ABOUT SECTION
**Current State:** Text-only testimonials
**Missing Visuals:** Avatar images for testimonial authors

#### Required Assets:
```
TESTIMONIAL AVATARS (150×150px - Circular crops):
avatars/testimonials/
├── garcia-family.jpg        (Family representative photo)
├── veteran-success-1.jpg    (Veteran testimonial)
├── veteran-success-2.jpg    (Another veteran success)
├── family-story.jpg         (Family success story)
└── community-impact.jpg     (Community member)

TEAM/STAFF PHOTOS (300×300px - for About page):
avatars/team/
├── executive-director.jpg   (Leadership/founder)
├── operations-manager.jpg   (Operations lead)
├── community-coordinator.jpg (Client-facing staff)
├── veteran-liaison.jpg      (Veteran services specialist)
├── housing-specialist.jpg   (Housing counselor)
└── finance-director.jpg     (Finance/admin lead)
```

---

### 4. SERVICE/FEATURE ICONS (UI System)
**Current State:** Text labels only, some emoji
**Best Solution:** Use icon library (NOT individual downloads)

#### Icon Requirements:
```
CORE SERVICES (8 icons minimum):
├── 🏠 Housing/Property icon
├── 📋 Section 8 Voucher icon
├── 🛠️ Renovation/Construction icon
├── ✅ Quality Standards icon
├── 👥 Community/Veteran Support icon
├── 💰 Affordability/Fair Pricing icon
├── 🤝 Partnership/Collaboration icon
└── 📞 Support/Communication icon

ADDITIONAL UI ICONS (as needed):
├── ▶️ Play/Learn more
├── 🔍 Search/Filter
├── 📍 Location/Map
├── 📞 Phone/Contact
├── 💬 Chat/Message
└── ⭐ Rating/Featured

SOLUTION: Use Heroicons library (React components)
- Free, 350+ icons
- Built-in Next.js compatibility
- Scalable (w-4, w-6, w-8, w-12, etc)
- Color customizable
```

---

### 5. BACKGROUND PATTERNS & TEXTURE
**Current State:** One wood texture (patio_wood.jpg) at 10% opacity
**Improvement Needed:** Additional subtle backgrounds

#### Required Assets:
```
PATTERNS (1920×1920px or 200×200px repeating):
patterns/
├── wood-texture.jpg         (Keep/improve current)
├── neutral-weave.png        (Subtle fabric-like texture)
├── concrete-light.jpg       (Industrial/modern feel)
└── linen-subtle.png         (Soft, natural texture)

GRADIENT OVERLAYS (1920×1080px PNG with transparency):
overlays/
├── blue-gradient-20.png     (20% opacity blue overlay)
├── green-gradient-15.png    (15% opacity green overlay)
└── neutral-gradient-10.png  (10% opacity neutral overlay)
```

---

## 🔗 SOURCE RECOMMENDATIONS

### PRIMARY SOURCES (Free, High Quality, No Attribution Required)

#### **1. PEXELS (Top Recommendation)**
- **URL:** https://www.pexels.com
- **Best For:** Hero images, lifestyle photos, property interiors
- **Quality:** Excellent (professional photographers)
- **License:** Creative Commons Zero (completely free, no attribution)
- **Search Queries:**
  ```
  Hero Images:
  - "family happy home" → family moving in day photos
  - "veteran home" → vet-focused housing
  - "renovated kitchen" → after-renovation showcase
  - "modern apartment living room" → 1-2 bedroom showcase
  - "neighborhood street" → community/neighborhood feel
  - "diverse family moving" → inclusive representation
  
  Property Details:
  - "hardwood floors" → flooring quality detail
  - "modern bathroom" → bathroom renovation
  - "energy efficient" → efficiency features
  - "handicap accessible" → accessible features
  - "outdoor patio" → outdoor space
  
  Patterns/Backgrounds:
  - "texture" → various textures
  - "concrete background" → industrial feel
  - "wood grain" → wood patterns
  ```

#### **2. UNSPLASH (Alternative)**
- **URL:** https://unsplash.com
- **Best For:** High-end professional photography, diverse people
- **Quality:** Very High (premium photographer focus)
- **License:** Unsplash License (free forever)
- **Search Queries:**
  ```
  - "before after renovation"
  - "affordable housing"
  - "diverse professional team"
  - "community gathering"
  - "happy family"
  ```

#### **3. PIXABAY**
- **URL:** https://pixabay.com
- **Best For:** Backup source, specific housing/construction
- **Quality:** Good
- **License:** Pixabay License (free, no attribution)
- **Search Queries:**
  ```
  - "apartment interior"
  - "house renovation"
  - "construction progress"
  - "keys to new home"
  - "family celebration"
  ```

#### **4. HEROICONS (Icon Library - RECOMMENDED)**
- **URL:** https://heroicons.com
- **Best For:** UI icons, service badges, interface elements
- **Quality:** Perfect (Tailwind creator)
- **License:** MIT (free, open source)
- **Installation:**
  ```bash
  npm install @heroicons/react
  ```
- **Usage Example:**
  ```tsx
  import { HomeIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
  <HomeIcon className="w-8 h-8 text-brand-sage" />
  ```

#### **5. SVG WAVE (Dividers)**
- **URL:** https://svgwave.in/
- **Best For:** Wave dividers, section separators
- **Quality:** Customizable to brand colors
- **License:** Free to use/modify
- **How to Use:** Generate waves online, export as SVG

---

## 📁 RECOMMENDED DIRECTORY STRUCTURE

```
/web/public/images/
│
├── logo/
│   ├── logo-full-color.png          (Horizontal version)
│   ├── logo-icon-only.png           (Icon for favicon)
│   ├── logo-white.png               (For dark backgrounds)
│   └── favicon-32x32.png
│
├── hero/
│   ├── seller-hero-1920x1080.jpg    (Left hero image)
│   ├── renter-hero-1920x1080.jpg    (Right hero image)
│   ├── veteran-hero-1920x1080.jpg   (Alternative 1)
│   └── community-hero-1920x1080.jpg (Alternative 2)
│
├── properties/
│   ├── before-after/
│   │   ├── property-1/
│   │   │   ├── before.jpg
│   │   │   ├── after.jpg
│   │   │   └── progress-1.jpg (optional mid-renovation)
│   │   ├── property-2/
│   │   │   ├── before.jpg
│   │   │   └── after.jpg
│   │   ├── property-3/
│   │   │   ├── before.jpg
│   │   │   └── after.jpg
│   │   ├── property-4/
│   │   │   ├── before.jpg
│   │   │   └── after.jpg
│   │   └── property-5/
│   │       ├── before.jpg
│   │       └── after.jpg
│   │
│   ├── types/
│   │   ├── 1-bedroom-modern.jpg     (400×300px)
│   │   ├── 2-bedroom-family.jpg     (400×300px)
│   │   ├── 3-bedroom-spacious.jpg   (400×300px)
│   │   ├── accessible-home.jpg      (400×300px)
│   │   ├── urban-efficiency.jpg     (400×300px)
│   │   └── suburban-comfort.jpg     (400×300px)
│   │
│   ├── neighborhood/
│   │   ├── street-community.jpg     (600×400px)
│   │   ├── park-access.jpg          (600×400px)
│   │   ├── transit-accessible.jpg   (600×400px)
│   │   ├── local-amenities.jpg      (600×400px)
│   │   └── diverse-community.jpg    (600×400px)
│   │
│   └── details/
│       ├── kitchen-modern.jpg       (500×400px)
│       ├── bathroom-accessible.jpg  (500×400px)
│       ├── flooring-quality.jpg     (500×400px)
│       ├── energy-efficient.jpg     (500×400px)
│       └── outdoor-space.jpg        (500×400px)
│
├── avatars/
│   ├── testimonials/
│   │   ├── garcia-family.jpg        (150×150px, circular)
│   │   ├── veteran-success-1.jpg    (150×150px, circular)
│   │   ├── veteran-success-2.jpg    (150×150px, circular)
│   │   ├── family-story.jpg         (150×150px, circular)
│   │   └── community-impact.jpg     (150×150px, circular)
│   │
│   └── team/
│       ├── executive-director.jpg   (300×300px)
│       ├── operations-manager.jpg   (300×300px)
│       ├── community-coordinator.jpg (300×300px)
│       ├── veteran-liaison.jpg      (300×300px)
│       ├── housing-specialist.jpg   (300×300px)
│       └── finance-director.jpg     (300×300px)
│
├── patterns/
│   ├── wood-texture.jpg             (1920×1920px or 200×200px repeating)
│   ├── neutral-weave.png            (1920×1920px or 200×200px repeating)
│   ├── concrete-light.jpg           (1920×1920px or 200×200px repeating)
│   └── linen-subtle.png             (1920×1920px or 200×200px repeating)
│
├── overlays/
│   ├── blue-gradient-20.png         (1920×1080px, 20% opacity)
│   ├── green-gradient-15.png        (1920×1080px, 15% opacity)
│   └── neutral-gradient-10.png      (1920×1080px, 10% opacity)
│
├── illustrations/
│   ├── wave-divider.svg             (Section separator)
│   ├── success-illustration.svg     (Success/achievement graphic)
│   ├── community-illustration.svg   (Community/connection graphic)
│   └── journey-illustration.svg     (Transformation journey graphic)
│
└── patio_wood.jpg                   (Keep as fallback/legacy)
```

---

## 🚀 IMPLEMENTATION ROADMAP

### PHASE 1: CRITICAL (Week 1)
**Goal:** Transform homepage from generic to professional

**Tasks:**
- [ ] Download 4 hero images from Pexels (seller, renter, veteran, community)
- [ ] Organize into `/images/hero/` folder
- [ ] Install Heroicons: `npm install @heroicons/react`
- [ ] Update `ModernHero.tsx` to use hero image instead of texture overlay
- [ ] Add 4-6 hero icons to home page features
- [ ] Test hero image responsive sizing

**Estimated Time:** 2-4 hours
**Visual Impact:** HIGH (transforms above-fold experience)

**Code Changes Required:**
```tsx
// ModernHero.tsx - Replace texture with actual image
// OLD:
bg-[url('/assets/patio_wood.jpg')] opacity-10

// NEW:
style={{ backgroundImage: `url('/images/hero/seller-hero-1920x1080.jpg')` }}

// Add service icons
import { HomeIcon, CheckCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid';
```

---

### PHASE 2: HIGH PRIORITY (Week 2)
**Goal:** Populate projects page with professional property imagery

**Tasks:**
- [ ] Download 5 before/after property pairs from Pexels
- [ ] Download 6 property type showcase images
- [ ] Organize into `/images/properties/` structure
- [ ] Download 5 neighborhood/community photos
- [ ] Create fallback image gallery in ProjectCard component
- [ ] Test lazy loading performance

**Estimated Time:** 4-6 hours
**Visual Impact:** VERY HIGH (core value proposition page)

**Database Integration:**
```tsx
// Firebase projects can now include image URLs
featured_image_url: "/images/properties/types/2-bedroom-family.jpg"
before_image_url: "/images/properties/before-after/property-1/before.jpg"
after_image_url: "/images/properties/before-after/property-1/after.jpg"
```

---

### PHASE 3: MEDIUM PRIORITY (Week 3)
**Goal:** Build social proof with testimonials and team

**Tasks:**
- [ ] Download 4-5 testimonial avatar photos
- [ ] Download 4-6 team member photos
- [ ] Organize into `/images/avatars/` folders
- [ ] Update testimonial component to display avatars
- [ ] Create/update About page with team section
- [ ] Add team member bios and roles

**Estimated Time:** 3-5 hours
**Visual Impact:** MEDIUM (builds trust and credibility)

---

### PHASE 4: POLISH (Week 4+)
**Goal:** Professional refinement and edge cases

**Tasks:**
- [ ] Download background pattern variations
- [ ] Create/download wave dividers
- [ ] Optimize all images for web (JPG 65-75% quality, WebP variants)
- [ ] Set up image optimization pipeline
- [ ] Add alt text to all images (SEO + accessibility)
- [ ] Performance testing with Lighthouse
- [ ] Handle missing images gracefully with fallbacks

**Estimated Time:** 4-8 hours
**Visual Impact:** MEDIUM-HIGH (performance and polish)

---

## 💻 CODE INTEGRATION EXAMPLES

### 1. Hero Image Integration (ModernHero.tsx)

```tsx
// BEFORE: Texture overlay
<div 
  className="absolute inset-0 bg-cover bg-center opacity-10"
  style={{
    backgroundImage: `url('/assets/patio_wood.jpg')`
  }}
/>

// AFTER: Actual hero image with gradient overlay
<div className="absolute inset-0 bg-cover bg-center">
  <Image
    src="/images/hero/seller-hero-1920x1080.jpg"
    alt="Properties 4 Creation - Affordable Housing for Veterans"
    fill
    className="object-cover"
    priority
  />
</div>
{/* Overlay for text legibility */}
<div className="absolute inset-0 bg-black/30" />
```

### 2. Icon Implementation (Home Page Features)

```tsx
import { HomeIcon, CheckCircleIcon, UserGroupIcon, HeartHandshakeIcon } from '@heroicons/react/24/solid';

<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  <div>
    <HomeIcon className="w-8 h-8 text-brand-sage mb-4" />
    <h3>Affordable Housing</h3>
  </div>
  <div>
    <CheckCircleIcon className="w-8 h-8 text-brand-teal mb-4" />
    <h3>Quality Standards</h3>
  </div>
  {/* More features... */}
</div>
```

### 3. Lazy Loading Images (ProjectCard)

```tsx
import Image from 'next/image';

<Image
  src={afterImageUrl}
  alt={project.title}
  fill
  className="object-cover"
  loading="lazy"  // Only load when in viewport
  quality={75}    // Optimized quality (75-85% is sweet spot)
/>
```

### 4. Testimonial Avatars

```tsx
interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

<div className="flex items-center gap-4">
  <Image
    src={testimonial.avatarUrl}
    alt={testimonial.name}
    width={60}
    height={60}
    className="rounded-full"
  />
  <div>
    <p className="font-semibold">{testimonial.name}</p>
    <p className="text-sm text-slate-600">{testimonial.role}</p>
  </div>
</div>
```

---

## ⚡ IMAGE OPTIMIZATION BEST PRACTICES

### File Size & Format Guidelines

| Type | Format | Max Size | Quality | Cache |
|------|--------|----------|---------|-------|
| Hero Images | JPG | 800-900KB | 70-75% | Long |
| Project Photos | JPG | 300-400KB | 65-70% | Medium |
| Thumbnails | JPG | 50-100KB | 60-65% | Medium |
| Avatars | JPG | 30-50KB | 70-75% | Long |
| Patterns | PNG | 50-100KB | - | Long |
| Icons | SVG | <20KB | - | Long |

### Compression Strategy

```bash
# Using ImageMagick (Windows):
magick photo.jpg -quality 75 -resize 1920x1080 photo-optimized.jpg

# Using FFmpeg:
ffmpeg -i input.jpg -q:v 5 output.jpg

# Using online tools:
# - https://tinypng.com (JPG & PNG optimization)
# - https://imageoptim.com (Advanced optimization)
# - https://www.birme.net (Batch resize & optimize)
```

---

## 🎨 BRAND CONSISTENCY GUIDELINES

### Color Palette (Apply to images)
- **Primary:** Navy #1e293b
- **Accent:** Sage Green #059669
- **Highlight:** Teal #0891b2
- **Action:** Red #dc2626
- **Warm:** Sand #f5deb3

### Photography Style
- **Tone:** Warm, hopeful, diverse, authentic
- **Lighting:** Natural light when possible, bright and airy
- **Diversity:** Include diverse ages, ethnicities, abilities
- **Authenticity:** Real people/spaces over generic stock photos
- **Composition:** Wide shots for context, detail shots for quality

### Image Treatment
- **Borders:** None (edge-to-edge preferred)
- **Overlays:** Subtle gradients/overlays for text legibility
- **Corners:** Rounded corners for modern feel (8-16px)
- **Shadows:** Soft shadows for depth (shadow-lg in Tailwind)

---

## 📈 SUCCESS METRICS

After implementation, measure:

1. **Visual Engagement**
   - Homepage bounce rate reduction
   - Time on page increase
   - Scroll depth (how far users scroll)

2. **Project Interest**
   - Project card click-through rate
   - Before/after carousel engagement
   - Property type filter usage

3. **Trust Indicators**
   - Testimonial section view time
   - Team section clicks
   - Form submission rate increase

4. **Performance**
   - Lighthouse score (target: >85)
   - Cumulative Layout Shift (CLS) <0.1
   - Largest Contentful Paint (LCP) <2.5s

---

## 🔗 QUICK REFERENCE LINKS

### Image Sources
- Pexels: https://www.pexels.com
- Unsplash: https://unsplash.com
- Pixabay: https://pixabay.com
- Heroicons: https://heroicons.com

### Tools
- Batch Resize: https://www.birme.net
- Image Compression: https://tinypng.com
- Wave Dividers: https://svgwave.in/
- Color Picker: https://www.colorpicker.com

### Next.js Image Optimization
- Next.js Image Docs: https://nextjs.org/docs/api-reference/next/image
- Image Optimization Guide: https://nextjs.org/docs/basic-features/image-optimization

---

## ✅ IMPLEMENTATION CHECKLIST

### Pre-Implementation
- [ ] Create `/images/` subdirectories structure
- [ ] Read through this guide completely
- [ ] Bookmark image source links
- [ ] Install Heroicons (`npm install @heroicons/react`)

### Phase 1 Implementation
- [ ] Download hero images (4 total)
- [ ] Add to `/images/hero/`
- [ ] Update ModernHero.tsx
- [ ] Add service icons to home page
- [ ] Test on mobile/tablet/desktop
- [ ] Deploy to gh-pages
- [ ] Measure analytics baseline

### Phase 2 Implementation
- [ ] Download before/after property pairs (5)
- [ ] Download property type images (6)
- [ ] Download neighborhood photos (5)
- [ ] Organize into `/images/properties/`
- [ ] Test ProjectCard with images
- [ ] Update Firebase project records
- [ ] Deploy updates

### Phase 3 Implementation
- [ ] Download testimonial avatars (4-5)
- [ ] Download team photos (4-6)
- [ ] Create testimonials component with avatars
- [ ] Create/update About page
- [ ] Deploy updates

### Phase 4 Implementation
- [ ] Optimize all images
- [ ] Add alt text to all images
- [ ] Create pattern variants
- [ ] Test performance (Lighthouse)
- [ ] Final deployment

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues & Solutions

**Q: Images not loading?**
- A: Check file paths are correct relative to `/public/images/`
- Use DevTools Network tab to see 404 errors
- Ensure filenames match exactly (case-sensitive on Linux servers)

**Q: Images too large/slow?**
- A: Compress to 70-75% JPG quality, resize to max 1920px wide
- Use WebP format with JPG fallback: `<picture><source srcset="img.webp"><img src="img.jpg"></picture>`
- Enable image optimization in Next.js (automatic with next/image)

**Q: Can't decide which image?**
- A: Download 2-3 options, preview, keep the most professional
- Test with your color scheme (navy/sage/teal overlay)
- Ensure diverse, authentic representation

**Q: Running out of storage?**
- A: Use PNG for graphics, JPG for photos
- Compress first, delete originals after
- Consider image CDN (Cloudinary, Imgix) for very large sites

---

## 🎓 LEARNING RESOURCES

- Next.js Image Component: https://nextjs.org/docs/api-reference/next/image
- Responsive Images Guide: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- Web Performance: https://web.dev/performance/
- Accessibility Alt Text: https://www.w3.org/WAI/tutorials/images/

---

**Next Step:** Download 4 hero images from Pexels and let me help you integrate them into the hero component!
