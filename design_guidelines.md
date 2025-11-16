# Qatar Digital Solutions - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium digital agency portfolios (Awwwards-style agencies, Apple's product pages for clean hierarchy) with Middle Eastern luxury aesthetics. Focus on trustworthy, premium presentation suitable for Qatar's business market.

## Color Palette
- **Primary Maroon**: #7D0B2E (CTAs, headers, accents)
- **Primary Gold**: #D4AF37 (secondary CTAs, highlights, decorative elements)
- **White**: #FFFFFF (backgrounds, text on dark)
- **Dark Gray**: #2C2C2C (body text, secondary backgrounds)
- **Light Gray**: #F5F5F5 (section backgrounds, alternating sections)

## Typography
- **Headings**: Poppins (600-700 weight) via Google Fonts - Modern, professional, excellent Arabic support
- **Body**: Inter (400-500 weight) - High readability for both English and Arabic
- **Sizes**: H1: 3.5rem/2.5rem(mobile), H2: 2.5rem/2rem(mobile), H3: 1.75rem, Body: 1.125rem, Small: 0.875rem

## Layout System
**Spacing**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: gap-8 (desktop), gap-6 (mobile)
- Container: max-w-7xl with px-6 padding

## Bilingual Structure
- Language toggle in top-right header (English/العربية)
- RTL layout transformation for Arabic: text-right, reversed flex/grid directions
- All text content duplicated in both languages with smooth transition

## Component Library

### Hero Section
- Full-width background with overlay (maroon gradient overlay at 70% opacity over premium office/tech image)
- Centered content: Large headline, subheading, two CTAs (maroon solid + gold outline)
- Height: 85vh with breathing room
- CTAs with blurred background (backdrop-blur-sm bg-maroon/90)

### Services Grid
- 2-column grid (stack mobile): Mobile Apps | Website Development
- Each service has 4 sub-services in card format
- Cards: white background, subtle shadow, gold accent border on hover
- Icons from Heroicons for each service

### Portfolio Tabs
- Horizontal tab navigation (maroon active state, gold underline)
- 3-column grid for projects (stack to 1 column mobile)
- Project cards: Image thumbnail, title, category badge, "View Details" link
- Hover: scale transform (1.02), enhanced shadow

### Process Timeline
- Horizontal 5-step flow (vertical on mobile)
- Numbered circles (gold background, maroon text)
- Connecting lines between steps
- Each step: Icon, title, brief description

### Why Choose Us
- 2-column grid of 5 reasons (asymmetric 3+2 split)
- Large icons (Heroicons), maroon headings, gray descriptive text
- Subtle gold dividers between items

### Contact Form
- Single column form with clear labels
- Checkbox group for service selection (custom styled, gold checkmarks)
- Maroon submit button (full-width mobile)
- Form positioned left, contact info/map placeholder right (2-column desktop)

### Header/Navigation
- Sticky header, white background with subtle shadow on scroll
- Logo left, nav center, language toggle + CTA right
- Mobile: Hamburger menu with slide-in panel
- Links: maroon on hover with gold underline animation

### Footer
- 4-column layout (Services, Company, Contact, Social) - stack mobile
- Dark gray background, white text
- Gold social icons

## Animation System

### Animation Library
The site uses **Framer Motion** for all animations, providing smooth, performant, and accessible transitions.

### Animation Variants (client/src/lib/animations.ts)
Reusable animation presets for consistent motion design:

- **fadeInUp**: Fade in with upward slide (60px) - used for section headers
- **fadeIn**: Simple opacity fade - used for background elements
- **scaleIn**: Fade in with subtle scale (0.9 → 1) - used for cards appearing
- **slideInLeft**: Slide in from left (-60px) - used for LTR content
- **slideInRight**: Slide in from right (60px) - used for RTL content
- **staggerContainer**: Container for staggered children animations
- **staggerItem**: Individual item in stagger sequence (0.1s delay between items)
- **floatingAnimation**: Continuous subtle floating motion (±10px over 6s)
- **pulseGlow**: Continuous pulsing opacity effect (0.6 ↔ 1 over 2s)

### Animation Timing
- **Duration**: 0.5-0.8 seconds for most transitions
- **Easing**: Custom cubic-bezier [0.22, 1, 0.36, 1] for premium feel
- **Stagger Delay**: 0.1-0.15 seconds between items
- **Scroll Trigger**: once: true, amount: 0.2-0.3 (trigger when 20-30% visible)

### Component-Specific Animations

**Hero Section**:
- Background: Scale in from 1.1 to 1 with fade (1.5s duration)
- Headline: Fade in from bottom with sequential word appearance
- CTA Buttons: Slide up with 0.4s delay
- Gradient Overlay: Fade in over 1s

**Service Cards**:
- Container: Stagger animation with 0.1s delay between cards
- Cards: Fade in with upward slide (20px)
- Icons: Rotate 360° on hover (0.5s duration)
- Hover: Scale to 1.03 with smooth transition

**Portfolio Cards**:
- Grid: Stagger container with progressive reveal
- Cards: Fade in with upward slide
- Hover: Scale to 1.05, enhanced shadow
- Images: Scale to 1.1 on card hover
- Modal: Fade in with scale (0.95 → 1), backdrop blur

**Testimonials Carousel**:
- Slide Transitions: AnimatePresence with fade + vertical slide
- Auto-rotation: 6-second intervals (paused on reduced motion)
- Navigation: Smooth slide animation between testimonials
- Quote Icon: Subtle pulse glow effect

**Contact Section**:
- Form: Slide in from left with fade (-30px)
- Contact Info: Slide in from right with fade (30px)
- Heading: Fade in from top (30px)
- Stagger delay: 0.2s between form and info

**Process Timeline**:
- Steps: Stagger animation with 0.15s delay
- Numbers: Scale in with rotation
- Icons: Subtle hover scale (1.1)
- Connecting Lines: Draw animation on scroll

**Why Choose Section**:
- Container: Stagger animation with 0.1s delay between items
- Cards: Fade in with upward slide (20px) using staggerItem variant on scroll
- Icons: No scroll-triggered scale animation
- Hover (desktop only): Icon container rotates 360° and scales to 1.1 (0.5s duration)
- No animated number counters (static text content)

**Navigation/Header**:
- Sticky header with shadow appearing on scroll
- Smooth scroll behavior between sections (scroll-behavior: smooth)
- Desktop navigation links: Underline fade animation on hover
- Mobile menu: Shadcn Drawer component slides in from right with easing
- Language toggle: Instant content swap (no transition animation)
- Scroll progress indicator: Animated progress bar (if implemented)

### Accessibility

**Reduced Motion Support**:
The application respects user preferences for reduced motion via `prefers-reduced-motion` media query.

Implementation:
- **Global Config**: `MotionConfig` in App.tsx applies reduced motion settings to all animations
- **useReducedMotion Hook**: Detects user preference and listens for changes
- **Auto-play**: Testimonials carousel auto-rotation pauses when reduced motion is preferred
- **SSR Safety**: Hook includes window guard for server-side rendering compatibility

When reduced motion is enabled:
- **Disabled**: All scroll-triggered entrance animations (initial/animate variants)
- **Disabled**: Testimonials carousel auto-rotation
- **Disabled**: Mobile drawer slide animation (instant open/close instead)
- **Persists**: Hover and tap interactions (scale, rotate on user interaction)
- **Persists**: Continuous keyframe animations (floating, pulsing, hero button hover)

**Known Limitation**: 
Per-component hover/tap animations and continuous decorative animations currently persist when reduced motion is enabled. This is because MotionConfig only disables initial/animate variants, not whileHover or continuous animate variants. For stricter reduced motion compliance, these effects would need conditional gating using the useReducedMotion hook.

**Best Practices**:
- Use MotionConfig for global motion control of entrance/exit animations
- All scroll animations trigger once (once: true) to prevent repeated distractions
- Animations never cause layout shifts
- Interactive hover animations are subtle (scale: 1.03-1.1 maximum)
- Continuous animations reserved for decorative elements only
- For full reduced motion compliance, gate hover/continuous animations with useReducedMotion hook

### RTL Animation Behavior
All animations work seamlessly in RTL mode:
- Slide directions are axis-neutral (y-axis transformations)
- Horizontal slides use relative positioning that respects text direction
- Stagger animations maintain correct visual flow in Arabic

## Images Strategy

**Hero Section**: Large, high-quality image showing modern office workspace or digital collaboration (Qatar business context). Image should convey professionalism and technology. Maroon gradient overlay (70% opacity) to ensure text readability.

**Portfolio Section**: 6 placeholder project images (3 mobile app screenshots, 3 website screenshots). Mobile apps shown in device mockups, websites as browser screenshots. Each 400x300px thumbnails.

**Services Section**: Consider abstract tech/code pattern backgrounds or geometric shapes in maroon/gold - no photos needed here.

**Why Choose Us**: Icon-based, no images.

**Process**: Icon-based, no images.

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (full multi-column layouts)

## Animations
- Minimal, professional: Smooth hover transitions (0.3s ease)
- Scroll-triggered fade-ins for sections (intersection observer)
- Tab switching: smooth content fade
- NO distracting parallax or heavy animations

## Accessibility
- ARIA labels for language toggle and navigation
- Focus states: 2px gold outline offset
- Color contrast: Ensure AA compliance (maroon/gold on white backgrounds)
- Form validation with clear error states (red with icons)
- Keyboard navigation support throughout

This creates a premium, bilingual portfolio that establishes trust with Qatar's business community through professional design, clear service presentation, and cultural sensitivity.