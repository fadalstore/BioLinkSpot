# LinkHub - Monetized Social Media Link Aggregator

## Overview

LinkHub is a comprehensive "link-in-bio" platform that enables content creators to showcase their social media presence while generating real revenue. Built with React, Express, PostgreSQL, and Stripe integration, it offers a complete monetization ecosystem with tip jars, premium subscriptions, analytics tracking, and customizable themes for maximum engagement and earning potential.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **UI Library**: Shadcn/UI components built on top of Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Language**: TypeScript throughout the stack for consistency
- **Payment Processing**: Stripe integration for tips and premium subscriptions
- **Data Storage**: In-memory storage with support for tips, analytics, and user payments
- **API Design**: RESTful endpoints for profiles, payments, analytics, and monetization features
- **Development**: ESBuild for server bundling and production deployment

### Database Schema
- **Users Table**: Profile information with Stripe customer IDs and premium plan tracking
- **Social Links Table**: Platform-specific links (Instagram, Twitter, LinkedIn, etc.)
- **Tips Table**: Payment tracking for tip jar functionality with amounts and status
- **Analytics Table**: Comprehensive tracking of views, clicks, and user interactions
- **ORM**: Drizzle ORM configured for PostgreSQL with schema validation using Zod

### Theme System
- **Multi-theme Support**: Light, dark, and gradient themes with CSS custom properties
- **Dynamic Switching**: Client-side theme persistence with localStorage
- **Component Integration**: Theme-aware components using context API

### UI/UX Features
- **Responsive Design**: Mobile-first approach with adaptive layouts across all devices
- **Interactive Elements**: Hover effects, click animations, and smooth transitions
- **Social Platform Integration**: Pre-configured styling for major social platforms
- **Tabbed Interface**: Organized sections for Links, Tips, Premium, and Analytics
- **Share Functionality**: Native web share API with clipboard fallback
- **Toast Notifications**: User feedback for payments, subscriptions, and interactions

### Monetization Features
- **Tip Jar System**: Accept one-time payments with custom amounts and quick-tip buttons
- **Premium Subscriptions**: Three-tier subscription model (Basic $4.99, Pro $9.99, Business $19.99)
- **Analytics Dashboard**: Track profile views, link clicks, engagement rates, and revenue
- **Stripe Integration**: Secure payment processing for tips and subscriptions
- **Recent Supporters**: Display of recent tip contributors to encourage more donations

### Development Workflow
- **Hot Reload**: Vite HMR for instant development feedback
- **Type Safety**: Shared TypeScript types between client and server
- **Path Aliases**: Organized imports with @ prefixes for components and utilities
- **Error Handling**: Runtime error overlay for development debugging

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM for the frontend framework
- **Express.js**: Web server framework for API endpoints
- **TypeScript**: Type system for both client and server code

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants

### Data and State Management
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database ORM for PostgreSQL
- **Drizzle-Zod**: Schema validation integration
- **Neon Database**: Serverless PostgreSQL database service

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: Fast bundler for production builds
- **TSX**: TypeScript execution for Node.js development
- **PostCSS**: CSS processing with Tailwind integration

### Form and Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation for forms and API data
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Additional Features
- **Date-fns**: Date manipulation and formatting utilities
- **Wouter**: Lightweight routing library
- **Stripe**: Payment processing and subscription management
- **CMDK**: Command palette component integration
- **React Query**: Advanced caching for analytics and payment data