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
- Newsletter signup with gold accent

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