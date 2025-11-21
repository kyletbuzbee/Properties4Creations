# 🎨 New Components Usage Guide

## Components Created & Ready to Use

All three critical setup tasks are complete:
- ✅ Directory structure created
- ✅ Heroicons installed and verified
- ✅ Components built and tested

---

## 1. ServiceIcon Component

**Location:** `web/src/components/ServiceIcon.tsx`

**Purpose:** Displays single icons with consistent styling and sizing

### Available Icon Types:
- `housing` - Home/Property icon
- `quality` - Quality/Standards icon
- `community` - People/Community icon
- `affordable` - Money/Affordability icon
- `innovation` - Sparkles/Innovation icon
- `support` - Help/Support icon
- `location` - Map Pin/Location icon
- `phone` - Phone icon
- `email` - Envelope/Email icon
- `documentation` - Document/Record icon
- `partnership` - Approval/Partnership icon
- `efficiency` - Light Bulb/Energy icon

### Sizes:
- `sm` - 16px (w-4 h-4)
- `md` - 24px (w-6 h-6)
- `lg` - 32px (w-8 h-8) - Default
- `xl` - 48px (w-12 h-12)

### Usage Examples:

```tsx
import { ServiceIcon } from '@/components/ServiceIcon';

// Basic usage
<ServiceIcon type="housing" />

// Custom size
<ServiceIcon type="quality" size="xl" />

// With custom className
<ServiceIcon type="community" size="md" className="text-blue-600" />
```

---

## 2. IconBadge Component

**Location:** `web/src/components/IconBadge.tsx`

**Purpose:** Displays icon with title and description (perfect for feature cards)

### Props:
- `icon` - ServiceIconType (see list above)
- `title` - Display title (string)
- `description` - Description text (string)
- `variant` - 'default' | 'outline' | 'filled' (optional)

### Variants:
- `default` - Light background (recommended)
- `outline` - Border-based style
- `filled` - Solid background

### Usage Examples:

```tsx
import { IconBadge } from '@/components/IconBadge';

// Single badge
<IconBadge 
  icon="housing" 
  title="Affordable Housing" 
  description="Homes designed for veterans and families"
  variant="default"
/>

// Grid of badges (common pattern)
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <IconBadge 
    icon="housing" 
    title="Affordable Housing" 
    description="We provide quality homes at affordable prices"
  />
  <IconBadge 
    icon="quality" 
    title="Quality Standards" 
    description="Every home meets rigorous quality requirements"
  />
  <IconBadge 
    icon="support" 
    title="Ongoing Support" 
    description="We're here to help you every step of the way"
  />
</div>

// With outline variant
<IconBadge 
  icon="partnership" 
  title="Partner With Us" 
  description="Join our mission to transform housing"
  variant="outline"
/>
```

---

## 3. HeroImage Components

**Location:** `web/src/components/HeroImage.tsx`

**Purpose:** Reusable hero image components with intelligent overlay handling

### Three Variants Available:

#### A) HeroImage - Simple Hero with Overlay

```tsx
import { HeroImage } from '@/components/HeroImage';

// Basic hero image
<HeroImage 
  src="/images/hero/seller-hero-1920x1080.jpg"
  alt="Properties 4 Creation - Affordable Housing"
  overlayOpacity="medium"
  priority
/>

// With custom height
<HeroImage 
  src="/images/hero/seller-hero-1920x1080.jpg"
  alt="Hero Image"
  height={400}
  overlayOpacity="heavy"
/>

// With nested content
<HeroImage 
  src="/images/hero/seller-hero-1920x1080.jpg"
  alt="Hero Image"
  height={600}
>
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold">
      Welcome to Properties 4 Creation
    </h1>
  </div>
</HeroImage>
```

**Props:**
- `src` - Image path (string)
- `alt` - Alt text (string)
- `overlayOpacity` - 'none' | 'light' | 'medium' | 'heavy' (optional)
- `overlayColor` - 'black' | 'blue' | 'none' (optional)
- `height` - Height in pixels (default: 600)
- `priority` - Load immediately (default: false)
- `children` - Content to overlay (optional)

---

#### B) HeroImageGradient - Hero with Gradient Overlay

```tsx
import { HeroImageGradient } from '@/components/HeroImage';

// Top gradient (dark at top, transparent at bottom)
<HeroImageGradient 
  src="/images/hero/community-hero-1920x1080.jpg"
  alt="Community Hero"
  gradientDirection="top"
  priority
>
  <div className="absolute top-20 left-0 right-0">
    <h1 className="text-white text-4xl font-bold text-center">
      Join Our Community
    </h1>
  </div>
</HeroImageGradient>

// Both gradient (dark edges, transparent middle)
<HeroImageGradient 
  src="/images/hero/veteran-hero-1920x1080.jpg"
  alt="Veteran Focus"
  gradientDirection="both"
  height={500}
/>
```

**Props:**
- `src` - Image path
- `alt` - Alt text
- `height` - Height in pixels (default: 600)
- `priority` - Load immediately
- `gradientDirection` - 'top' | 'bottom' | 'both'
- `children` - Content layer

---

#### C) HeroImageSplit - Split-Screen Hero

```tsx
import { HeroImageSplit } from '@/components/HeroImage';

// Split hero (perfect for dual-narrative like ModernHero)
<HeroImageSplit 
  leftImage="/images/hero/seller-hero-1920x1080.jpg"
  rightImage="/images/hero/renter-hero-1920x1080.jpg"
  leftAlt="For Donors and Investors"
  rightAlt="For Renters and Veterans"
  priority
/>
```

**Props:**
- `leftImage` - Left side image path
- `rightImage` - Right side image path
- `leftAlt` - Left alt text
- `rightAlt` - Right alt text
- `height` - Height in pixels (default: 600)
- `priority` - Load immediately
- `overlayOpacity` - 'none' | 'light' | 'medium' | 'heavy'

---

## 📁 Directory Structure (Ready to Populate)

All directories have been created. Download your images and organize them as follows:

```
/web/public/images/
├── hero/                      (Hero images go here)
├── properties/
│   ├── before-after/         (Before/after photos)
│   ├── types/                (Property type showcase)
│   ├── neighborhood/         (Community context)
│   └── details/              (Kitchen, bathroom, etc)
├── avatars/
│   ├── testimonials/         (Testimonial photos)
│   └── team/                 (Team member photos)
├── patterns/                 (Background textures)
├── overlays/                 (Gradient overlays)
└── illustrations/            (SVG graphics)
```

---

## 🚀 Integration Examples for Home Page

### Example 1: Add Service Icons to Home Page

```tsx
// web/src/app/page.tsx

import { IconBadge } from '@/components/IconBadge';

export default function Home() {
  return (
    <>
      {/* Hero Section - unchanged for now */}
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Properties 4 Creation?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IconBadge 
              icon="housing" 
              title="Affordable Housing" 
              description="Homes accessible to veterans and families seeking stability"
            />
            <IconBadge 
              icon="quality" 
              title="Quality Standards" 
              description="Every property meets our rigorous renovation standards"
            />
            <IconBadge 
              icon="support" 
              title="Ongoing Support" 
              description="We're here to help you succeed in your new home"
            />
          </div>
        </div>
      </section>
    </>
  );
}
```

### Example 2: Update ModernHero to Use Hero Image

```tsx
// web/src/components/ModernHero.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { HeroImageSplit } from '@/components/HeroImage';

export default function ModernHero() {
  return (
    <>
      {/* Hero with images (when you have them) */}
      <HeroImageSplit 
        leftImage="/images/hero/seller-hero-1920x1080.jpg"
        rightImage="/images/hero/renter-hero-1920x1080.jpg"
        leftAlt="For Donors and Investors"
        rightAlt="For Renters and Veterans"
        overlayOpacity="light"
        priority
      />
      
      {/* Or fallback to color-only version (current) if images not ready */}
      <section className="relative h-screen bg-gradient-to-r from-brand-navy to-brand-navy">
        {/* ... rest of content ... */}
      </section>
    </>
  );
}
```

### Example 3: Add Icons to Section 8 Page

```tsx
import { ServiceIcon } from '@/components/ServiceIcon';

export default function Section8Page() {
  return (
    <section>
      <div className="flex items-center gap-4">
        <ServiceIcon type="documentation" size="lg" />
        <div>
          <h3>Section 8 Vouchers</h3>
          <p>Pay only 30% of your income for housing</p>
        </div>
      </div>
    </section>
  );
}
```

---

## 📊 Next Steps

### Immediate (Download & Place Assets):
1. Download 4 hero images from [Pexels](https://www.pexels.com)
   - Search: "family moving in", "veteran home", "community neighborhood"
   - Download to `/web/public/images/hero/`
   
2. Test with HeroImage component:
   ```tsx
   <HeroImage 
     src="/images/hero/seller-hero-1920x1080.jpg"
     alt="Seller Hero"
     priority
   />
   ```

### Short-term (Week 1):
- Integrate IconBadge components into home page
- Download property showcase images
- Update ProjectCard component with images

### Medium-term (Week 2-3):
- Add testimonial avatars
- Create team members section
- Download and organize all remaining assets

---

## ✅ Quick Reference

| Component | File | Use Case |
|-----------|------|----------|
| ServiceIcon | ServiceIcon.tsx | Single icon display |
| IconBadge | IconBadge.tsx | Icon + title + description card |
| HeroImage | HeroImage.tsx | Simple hero with overlay |
| HeroImageGradient | HeroImage.tsx | Hero with gradient |
| HeroImageSplit | HeroImage.tsx | Split-screen hero |

---

## 🐛 Troubleshooting

### Images not showing?
1. Check file path: `/images/` not `/assets/`
2. Verify file exists in directory
3. Use DevTools Network tab to check 404s
4. Ensure filename is lowercase and matches exactly

### Icons not showing?
1. Verify import: `import { ServiceIcon } from '@/components/ServiceIcon';`
2. Check icon type is in the list of available types
3. Run `npm run build` to verify compilation

### Build failing?
1. Run `npm install` to ensure all packages installed
2. Check for typos in component imports
3. Verify file paths use forward slashes `/` not backslashes `\`

---

**Everything is ready! Now just download your hero images and start integrating them.**
