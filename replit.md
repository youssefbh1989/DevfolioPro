# Qatar Digital Solutions - Portfolio Website

## Overview
Qatar Digital Solutions is a bilingual (English/Arabic) professional portfolio website for the Qatari market, showcasing mobile app and website development services. It functions as a marketing and lead generation tool, featuring services, portfolio, process, value propositions, and a contact form. The design follows the modern INSANE template aesthetic with a professional teal/blue-gray color palette and futuristic 3D animations.

## Recent Changes (November 17, 2025)

### Complete Design Redesign - INSANE Template Migration
- ✅ **Color Scheme Overhaul**: Migrated from maroon/gold to professional teal/blue-gray palette
  - Primary: #507D8E (teal) for main accents, headings, buttons, icons
  - Accent: #7BC8E2 (light blue) for highlights, prices, secondary accents
  - All inline color styles replaced with semantic Tailwind tokens (text-primary, bg-primary, text-accent)
  - Complete dark mode support via CSS variables
  - Updated design_guidelines.md with new color system

- ✅ **Enhanced 3D Animation System** (`client/src/lib/animations.ts`):
  - `cardHover`: 3D tilt effect with rotateX(-5deg), translateZ(40px), proper perspective hierarchy
  - `glowPulse`: Infinite glowing pulse for decorative elements
  - `diagonalSlideIn`: Diagonal entrance animations for modern feel
  - `morphIn`: Morphing entrance effects
  - All animations respect `prefers-reduced-motion` accessibility preference

- ✅ **Hero Section Redesign**:
  - Diagonal overlay elements with gradient backgrounds
  - Geometric accent lines for modern look
  - Floating glow pulse decorative elements (gated behind reduced motion)
  - Parallax background effects
  - Modern teal color scheme throughout

- ✅ **Services Section Complete Rebuild**:
  - Numbered cards (01, 02, 03, 04) with large background numbers
  - Left border accents (teal for mobile apps, light blue for websites)
  - 3D hover transforms with proper perspective context
  - Responsive number scaling: text-3xl (mobile) → text-4xl (sm) → text-6xl (md+)
  - Icon animations with scale and rotation on hover
  - Proper perspective hierarchy: parent wrapper → motion.div → Card

- ✅ **Admin Dashboard Complete Update**:
  - All pages (dashboard, projects, services, analytics) use teal color scheme
  - Removed all maroon (#7D0B2E) and gold (#D4AF37) inline styles
  - Updated stat displays, headings, buttons to use semantic tokens
  - Consistent futuristic card animations with 3D hover effects
  - Admin login page maintains special gradient design

- ✅ **Accessibility Improvements**:
  - All decorative animations gated behind `useReducedMotion` hook
  - Hero diagonal overlays respect motion preferences
  - Floating glow elements respect motion preferences
  - WCAG compliant motion accessibility

- ✅ **Mobile Optimization**:
  - Numbered overlays visible on all screen sizes (no longer hidden on mobile)
  - Responsive scaling prevents text collision
  - Proper overflow handling for 3D effects
  - Tested across multiple breakpoints

## Previous Changes (November 16, 2025)

### Portfolio Project Creation & Futuristic Animations
- ✅ Implemented complete portfolio project creation feature in admin dashboard
  - Dialog form with all bilingual fields (title, category, client, description, challenge, solution, results in English and Arabic)
  - Technologies input (comma-separated) and image URL field
  - Project type selector (Mobile App or Website)
  - Form validation and state management with proper cache invalidation
  - Success/error toast notifications
- ✅ Enhanced animation system with futuristic effects in `client/src/lib/animations.ts`:
  - `cardHover`: 3D card lift effect with `rotateX(-5deg)`, `translateZ(40px)`, `scale(1.02)` on hover
  - `magneticHover`: Magnetic pull effect with scale and translation
  - `glowPulse`: Infinite glowing pulse animation
  - `parallaxScroll`: Parallax scrolling helper for background effects
  - All animations use spring physics (stiffness: 300, damping: 20) for natural movement
  - Respect `prefers-reduced-motion` accessibility preference via MotionConfig
- ✅ Applied futuristic animations throughout the application:
  - Hero section: fadeInUp for title/subtitle, parallax background
  - Portfolio section: cardHover with 3D transforms on cards, stagger entrance
  - Services section: staggerContainer/Item for card entrance
  - Admin dashboard: staggered card entrance, cardHover on admin cards, magneticHover on logout button
  - Admin projects: staggered project card entrance with 3D hover effects
- ✅ End-to-end testing verified:
  - Portfolio creation works correctly with all bilingual fields
  - Projects appear in correct tab (mobile/website) after creation
  - Futuristic animations work smoothly across all pages
  - Admin authentication and navigation flow works properly

### Blog Image Fix
- ✅ Fixed broken/crashed images on blog page and blog detail pages
- ✅ Downloaded professional stock images for all 3 blog posts (mobile app development, web development, digital transformation)
- ✅ Updated database with correct image paths in `/attached_assets/stock_images/` directory
- ✅ Updated seed data to use correct images for future deployments
- ✅ All blog post images now load correctly on both listing and detail pages

### Blog Post Detail Page Implementation
- ✅ Created blog post detail page (route: `/blog/:slug`)
- ✅ Fixed 404 error when clicking "Read More" on blog posts
- ✅ Blog detail page displays: featured image, title, category, author, date, full content
- ✅ Back to Blog button for easy navigation
- ✅ Full bilingual support with RTL layout

### Additional Pages (About, Privacy, Careers, Blog)
- ✅ Created LanguageContext provider for shared bilingual state management
- ✅ Implemented About, Privacy Policy, Careers, and Blog listing pages
- ✅ Extended database schema with blogPosts and careers tables
- ✅ Added API endpoints for blog and careers
- ✅ Seeded 3 blog posts and 3 career positions with bilingual content
- ✅ Updated Navigation and Footer for consistent layout across all pages

## User Preferences
Preferred communication style: Simple, everyday language.

## Postponed Features
- **WhatsApp AI Chatbot** (November 17, 2025): User requested a fully automated bilingual (Arabic/English) AI chatbot for WhatsApp to:
  - Answer questions about services
  - Collect customer information
  - Schedule consultations
  - Provide pricing information
  - Respond automatically 24/7
  - Technical approach: Twilio for WhatsApp Business API + OpenAI/Replit AI for responses
  - Status: Feature postponed - user will request when ready to implement

## System Architecture

### Frontend
- **Technology Stack**: React 18+ with TypeScript, Vite, Wouter for routing, TanStack Query for server state, React Hook Form with Zod for form validation.
- **UI/UX**: shadcn/ui (New York style), Radix UI primitives, Tailwind CSS with a custom design system. INSANE template-inspired design with teal/blue-gray color palette (#507D8E primary, #7BC8E2 accent), Poppins and Inter typography. Fully responsive, mobile-first, with RTL support for Arabic.
- **State Management**: React hooks for local state, TanStack Query for API data.
- **Key Features**: Bilingual toggle, smooth scrolling, interactive portfolio modals, auto-rotating testimonials, contact form with validation, toast notifications, reusable section components.
- **Animation System**: Framer Motion for scroll-triggered animations, stagger effects, hover effects, and smooth transitions, with accessibility for `prefers-reduced-motion`.

### Backend
- **Technology Stack**: Express.js with TypeScript, Node.js, ESM.
- **API Design**: RESTful API under `/api`, JSON format, Zod for request validation.
- **API Endpoints**: `/contact` (POST, GET), `/portfolio` (GET, POST), `/testimonials` (GET, POST), `/blog` (GET, POST), `/careers` (GET, POST).
- **Middleware**: Express JSON body parser, request logging, URL-encoded support, static file serving (`/attached_assets`).
- **Storage Layer**: PostgreSQL database with Drizzle ORM.
- **Development Setup**: Vite integration with HMR, custom middleware for SSR-like experience.

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM.
- **Schema**: `contactSubmissions`, `portfolioProjects`, `testimonials`, `blogPosts`, `careers` tables with UUIDs and timestamps.
- **Validation**: Drizzle-Zod for schema-based validation.

### Build and Deployment
- **Build Process**: Client (Vite to `dist/public`), Server (esbuild to `dist/index.js`), TypeScript type checking, ESM output.
- **Environment Configuration**: `NODE_ENV`, `DATABASE_URL`.

## External Dependencies

### UI Libraries
- **Radix UI Components**: Accessible, unstyled UI primitives.
- **shadcn/ui**: Pre-built components based on Radix UI, customized with Tailwind CSS.
- **Lucide React**: Icon library.

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework.
- **Google Fonts**: Poppins, Inter.

### Data Management
- **TanStack Query (React Query)**: Server state management and caching.
- **React Hook Form**: Form state management with validation.
- **Zod**: Schema validation library.

### Database and ORM
- **Drizzle ORM**: Type-safe SQL query builder for PostgreSQL.
- **@neondatabase/serverless**: Serverless PostgreSQL driver.

### Build Tools
- **Vite**: Fast development server and optimized builds.
- **esbuild**: Fast JavaScript bundler for server.
- **TypeScript**: Static type checking.

### Utilities
- **class-variance-authority (CVA)**: Component variant management.
- **clsx & tailwind-merge**: Conditional className composition and Tailwind class conflict resolution.
- **date-fns**: Date manipulation.
- **nanoid**: Unique ID generation.