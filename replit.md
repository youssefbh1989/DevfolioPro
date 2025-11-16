# Qatar Digital Solutions - Portfolio Website

## Overview
Qatar Digital Solutions is a bilingual (English/Arabic) professional portfolio website for the Qatari market, showcasing mobile app and website development services. It functions as a marketing and lead generation tool, featuring services, portfolio, process, value propositions, and a contact form. The design is premium, agency-style, inspired by Middle Eastern luxury aesthetics.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Technology Stack**: React 18+ with TypeScript, Vite, Wouter for routing, TanStack Query for server state, React Hook Form with Zod for form validation.
- **UI/UX**: shadcn/ui (New York style), Radix UI primitives, Tailwind CSS with a custom design system. Custom color palette (maroon, gold), Poppins and Inter typography. Fully responsive, mobile-first, with RTL support for Arabic.
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