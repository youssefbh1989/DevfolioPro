# Qatar Digital Solutions - Portfolio Website

## Overview

Qatar Digital Solutions is a professional portfolio website showcasing mobile app and website development services for the Qatari market. The application is a full-stack solution featuring a bilingual (English/Arabic) interface with a premium, agency-style design inspired by Middle Eastern luxury aesthetics.

The platform serves as both a marketing site and a lead generation tool, with sections for services, portfolio showcase, process workflow, value propositions, and a contact form for consultation requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript
- Vite for build tooling and development server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- React Hook Form with Zod for form validation

**UI Component System:**
- shadcn/ui component library (New York style variant)
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for styling with custom design system
- CVA (Class Variance Authority) for component variants

**Design System:**
- Custom color palette featuring maroon (#7D0B2E) and gold (#D4AF37) reflecting Qatar luxury branding
- Typography: Poppins for headings, Inter for body text
- Fully responsive mobile-first approach
- RTL (Right-to-Left) layout support for Arabic language

**State Management:**
- React hooks for local component state
- TanStack Query for API data fetching and caching
- No global state management library (Redux, Zustand, etc.) as complexity doesn't warrant it

**Key Features:**
- Bilingual toggle (English/Arabic) with complete content translation
- Smooth scrolling navigation between sections
- Contact form with client-side validation
- Toast notifications for user feedback
- Reusable section components (Hero, Services, Portfolio, Process, Why Choose, Contact, Footer)

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- Node.js runtime environment
- ESM (ES Modules) for modern JavaScript imports

**API Design:**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Request validation using Zod schemas

**API Endpoints:**
- `POST /api/contact` - Submit consultation request
- `GET /api/contact` - Retrieve all contact submissions (admin-facing)

**Middleware:**
- Express JSON body parser with raw body capture for webhook support
- Custom request logging for API routes
- URL-encoded form data support

**Storage Layer:**
- In-memory storage implementation (MemStorage class)
- Interface-based design (IStorage) for easy database swapping
- Contact submissions stored with auto-generated UUIDs and timestamps

**Development Setup:**
- Vite integration with HMR (Hot Module Replacement)
- Custom middleware mode for SSR-like experience
- Development error overlay and debugging tools (Replit-specific plugins)

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using JavaScript Map
- No persistence between server restarts
- Suitable for development and demo purposes

**Database Schema (Ready for Migration):**
- Drizzle ORM configured for PostgreSQL
- Schema defined in `shared/schema.ts`
- Contact submissions table with fields:
  - id (UUID, auto-generated)
  - name (text, required)
  - company (text, required)
  - email (text, required, validated)
  - phone (text, required)
  - serviceNeeded (text, required - "Mobile App", "Website", or "Both")
  - projectDescription (text, required)
  - createdAt (timestamp, auto-generated)

**Validation:**
- Drizzle-Zod integration for schema-based validation
- Custom validation rules (email format, minimum lengths, etc.)
- Shared types between client and server for type safety

### Build and Deployment

**Build Process:**
- Client: Vite bundles React application to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- TypeScript type checking with `tsc`
- ESM output format for both client and server

**Environment Configuration:**
- `NODE_ENV` for development/production modes
- `DATABASE_URL` for PostgreSQL connection (when migrated from in-memory)
- Replit-specific environment variables for development tools

**Scripts:**
- `dev` - Development server with tsx hot reload
- `build` - Production build for both client and server
- `start` - Production server
- `db:push` - Push schema changes to database (Drizzle Kit)

## External Dependencies

### Third-Party UI Libraries

**Radix UI Components:**
- Comprehensive set of accessible, unstyled UI primitives
- Components: Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Form, Hover Card, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Tooltip
- Provides accessibility features (ARIA attributes, keyboard navigation) out of the box

**shadcn/ui:**
- Pre-built component library built on Radix UI
- Customized with "New York" style variant
- Tailwind CSS integration
- Components aliased under `@/components/ui`

**Lucide React:**
- Icon library used throughout the application
- Provides icons for navigation, services, features, and UI elements

### Styling and Design

**Tailwind CSS:**
- Utility-first CSS framework
- Custom configuration with brand colors and design tokens
- PostCSS for processing
- Autoprefixer for cross-browser compatibility

**Google Fonts:**
- Poppins (headings, 600-700 weight)
- Inter (body text, 400-500 weight)
- Loaded via HTML link tags for performance

### Data Management

**TanStack Query (React Query):**
- Server state management and caching
- Automatic background refetching
- Optimistic updates
- Custom query client configuration

**React Hook Form:**
- Form state management
- Performance optimization through uncontrolled components
- Integration with Zod for validation

**Zod:**
- Schema validation library
- Type inference for TypeScript
- Custom error messages
- Shared validation between client and server

### Database and ORM

**Drizzle ORM:**
- Type-safe SQL query builder
- PostgreSQL dialect configured
- Schema definition with `drizzle-orm/pg-core`
- Migration support via Drizzle Kit

**@neondatabase/serverless:**
- Serverless PostgreSQL driver
- Compatible with edge runtimes
- Connection pooling support

**connect-pg-simple:**
- PostgreSQL session store for Express
- Session persistence across server restarts

### Build Tools

**Vite:**
- Fast development server with HMR
- Optimized production builds
- React plugin for JSX transformation
- Path alias resolution

**esbuild:**
- Fast JavaScript bundler for server code
- ESM output with external package handling

**TypeScript:**
- Static type checking
- Strict mode enabled
- Path mappings for clean imports (`@/`, `@shared/`)

### Development Tools (Replit-Specific)

**@replit/vite-plugin-runtime-error-modal:**
- Development error overlay

**@replit/vite-plugin-cartographer:**
- Development mapping and debugging

**@replit/vite-plugin-dev-banner:**
- Development environment indicator

### Utilities

**class-variance-authority (CVA):**
- Component variant management
- Type-safe style composition

**clsx & tailwind-merge:**
- Conditional className composition
- Tailwind class conflict resolution

**date-fns:**
- Date manipulation and formatting library

**nanoid:**
- Unique ID generation for development logging

**cmdk:**
- Command menu component (included but not actively used)

**embla-carousel-react:**
- Carousel/slider component library (included but not actively used)