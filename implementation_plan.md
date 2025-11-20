# Implementation Plan

[Overview]
Implement comprehensive UX and visual improvements to Properties 4 Creation website to better serve two distinct audiences: property sellers/donors (business/speed focus) and veterans (support/safety focus). Changes include a split hero for clearer user journeys, refined color palette with warmer tones, story-focused project cards with before/after interactions, bento grid for stats visualization, multi-step lead form wizard, and improved accessibility with motion preferences support.

[Types]
New component interfaces for ModernHero, BentoGridStats, MultiStepLeadForm, and EnhancedProjectCard with before/after states. Project data types extended with before_image_url, after_image_url, progress_percentage, impact_badges, and status fields.

[Files]
- web/src/components/HeroSection.tsx → web/src/components/ModernHero.tsx (convert to split design)
- web/src/components/ProjectCard.tsx (redesign with hover interactions and impact bar)
- web/src/components/LeadForm.tsx (convert to multi-step wizard)
- web/src/app/about/page.tsx (replace stats grid with bento layout)
- web/src/components/ServicesGrid.tsx (update background to warm sand)
- web/src/components/TestimonialsCarousel.tsx (update background to warm sand)
- web/src/components/AnimationWrapper.tsx (add prefers-reduced-motion support)
- web/src/app/globals.css (add warm background colors per 60-30-10 rule)

[Functions]
- createMultiStepFormSteps(formData, currentStep) - manages form step navigation
- calculateProgressPercentage(project) - computes renovation completion status
- validateContrastRatio(color1, color2) - WCAG AA compliance checker
- handleBeforeAfterTransition(currentImage, targetImage) - smooth image transitions

[Classes]
- ModernHero: Split-screen component with seller/donor and veteran-focused sections
- BentoGridStats: CSS Grid-based layout with varied card sizes for statistics
- MultiStepLeadForm: State-managed wizard with progress indicator
- EnhancedProjectCard: Interactive component with before/after image transitions and progress bars

[Dependencies]
Add react-hook-form for multi-step form, framer-motion for smooth transitions, lucide-react for progress icons.

[Testing]
- Form validation tests for each wizard step
- Accessibility tests for prefers-reduced-motion and contrast ratios
- Responsive design tests for split hero on mobile
- Image transition performance tests for before/after interactions

[Implementation Order]
1. Update globals.css with warm color palette and glass effects
2. Implement ModernHero.tsx with split design replacing current HeroSection
3. Create BentoGridStats component and update about page
4. Redesign ProjectCard with before/after interactions and impact badges
5. Convert LeadForm to MultiStepLeadForm wizard
6. Update AnimationWrapper for motion preferences support
7. Apply warm sand backgrounds to ServicesGrid and TestimonialsCarousel
8. Update main page.tsx to use ModernHero instead of HeroSection
