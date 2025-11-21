# P4C Design System - Quick Reference Guide

## Color Palette

```tailwindcss
brand-navy:   #1e293b  /* Authority, professionalism */
brand-sage:   #059669  /* Trust, growth, action */
brand-red:    #dc2626  /* Attention, calls-to-action */
brand-slate:  #475569  /* Hierarchy, secondary text */
brand-olive:  #4d7c0f  /* Alternative accent */
brand-beige:  #ffffff  /* Clean background */
brand-sand:   #f8fafc  /* Subtle backgrounds */
```

## Component Reference

### Header Structure
```html
<header class="sticky top-0 z-50 bg-brand-navy text-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
    <!-- Logo -->
    <!-- Desktop Nav (hidden md:flex) -->
    <!-- Mobile Menu Button (lg:hidden) -->
  </div>
  <!-- Mobile Menu (lg:hidden) -->
</header>
```

### CTA Button
```html
<a href="#" class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all">
  Get Started
</a>
```

### Animation Examples
```tsx
/* Fade in from top */
<div class="animate-fade-in-up">Content</div>

/* Fade in from left */
<div class="animate-fade-in-left">Left Content</div>

/* Fade in from right */
<div class="animate-fade-in-right">Right Content</div>

/* Scale in */
<div class="animate-scale-in">Card</div>

/* Float animation */
<div class="animate-float">Floating Element</div>
```

### Responsive Text
```tailwindcss
text-4xl md:text-5xl lg:text-6xl
py-20 md:py-32
px-4 md:px-8 lg:px-16
```

## Spacing System

| Class | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| `py-20 md:py-32` | 128px | 128px | 80px |
| `py-16 md:py-20` | 80px | 80px | 64px |
| `px-4 md:px-8 lg:px-16` | 64px | 32px | 16px |

## Typography

**Headings:** `font-heading` → Merriweather (serif)
**Body:** `font-body` → Inter (sans-serif)

```tsx
<h1 className="text-4xl md:text-5xl font-heading font-bold">
  Your Heading
</h1>

<p className="text-lg text-slate-300">
  Your paragraph
</p>
```

## Responsive Navigation

```tsx
<nav className="hidden lg:flex items-center space-x-1">
  {navigation.map((item) => (
    <a
      href={item.href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
        item.current
          ? 'bg-white/20 text-white'
          : 'text-slate-200 hover:text-white hover:bg-white/10'
      }`}
    >
      {item.name}
    </a>
  ))}
</nav>
```

## Navigation Structure (5 Items)

1. **Home** → `/` or `index.html`
2. **Our Work** → `/projects` or `projects.html`
3. **Insights** → `/insights` or `insights.html`
4. **For Veterans** → `/resources` or `resources.html`
5. **About Us** → `/about` or `about.html`

## Mobile Menu Toggle

```javascript
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenuToggle.setAttribute('aria-expanded', 
    mobileMenuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
  );
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
  });
});
```

## Breakpoints

```tailwindcss
xs:   475px
sm:   640px
md:   768px
lg:  1024px  /* Desktop nav appears here */
xl:  1280px
2xl: 1536px
```

## Common Patterns

### Hero Section
```tsx
<section className="py-20 md:py-32 bg-brand-navy text-white">
  <div className="max-w-7xl mx-auto px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
      Heading
    </h1>
    <p className="text-lg text-slate-300 mb-8">
      Description
    </p>
  </div>
</section>
```

### Content Section
```tsx
<section className="py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Content */}
  </div>
</section>
```

### Card Component
```tsx
<div className="bg-white p-6 rounded-lg shadow-card hover:shadow-float transition-shadow hover-lift">
  <h3 className="font-heading text-xl font-bold mb-4">Title</h3>
  <p className="text-slate-600">Description</p>
</div>
```

### Footer
```tsx
<footer className="bg-brand-navy text-white py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
      {/* Footer columns */}
    </div>
  </div>
</footer>
```

## Hover Effects

```tailwindcss
/* Lift effect */
.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Scale effect */
hover:scale-105

/* Glow effect */
hover:shadow-lg hover:shadow-red-500/30

/* Text color */
hover:text-white
```

## Accessibility Features

- ✅ ARIA attributes on interactive elements
- ✅ Semantic HTML (header, nav, main, footer, article, section)
- ✅ Color contrast > 4.5:1 for AA compliance
- ✅ Focus indicators for keyboard navigation
- ✅ `prefers-reduced-motion` support
- ✅ Touch-friendly targets (44px minimum)
- ✅ Alt text on images
- ✅ Form labels and error messages

## Animation Duration Reference

| Duration | Use Case |
|----------|----------|
| 200ms | Fast, micro interactions |
| 300ms | Standard UI transitions |
| 400ms | Entry animations |
| 500ms | Slower entrance animations |
| 600ms | Hero section animations |
| 2000ms | Infinite/looping animations |
| 3000ms | Floating/pulsing elements |

## Common Issues & Fixes

### Mobile Menu Not Showing
```jsx
// Make sure element exists
const mobileMenu = document.getElementById('mobile-menu');
if (!mobileMenu) console.error('Mobile menu element not found');

// Check for hidden class
mobileMenu.classList.contains('hidden') // should be true initially
```

### Animations Not Working
```jsx
// Verify in tailwind.config.js
extend: {
  keyframes: {
    fadeInUp: { /* ... */ }
  },
  animation: {
    'fade-in-up': 'fadeInUp 0.6s ease-out'
  }
}

// Check Tailwind processing
@tailwind utilities; // must be present
```

### Header Overlap Issues
```jsx
// Add padding-top to main content
<main className="pt-16"> {/* 64px = h-16 */}
  {/* Content */}
</main>

// Or use scroll-padding
html { scroll-padding-top: 5rem; }
```

## Testing Checklist

- [ ] All navigation items link correctly
- [ ] Mobile menu opens/closes
- [ ] Animations play smoothly
- [ ] Colors display correctly
- [ ] Responsive at all breakpoints
- [ ] Links open in correct target
- [ ] Form inputs are accessible
- [ ] No console errors
- [ ] Touch-friendly on mobile
- [ ] Works in modern browsers

## Files to Reference

- **Web Components:** `web/src/components/Header.tsx`, `Footer.tsx`, `ModernHero.tsx`
- **Config:** `web/tailwind.config.js`, `web/src/app/globals.css`
- **P4C HTML:** `P4C/header-template.html`, `P4C/footer-template.html`
- **P4C CSS:** `P4C/static-enhanced.css`
- **Documentation:** `PHASE_2_COMPLETION_SUMMARY.md`, `INTEGRATION_GUIDE.md`

---

**Latest Update:** Phase 2 Complete
**Version:** 2.0
**Status:** Production Ready ✅
