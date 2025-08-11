# LinkHub - Social Media Link Aggregator

## Overview

LinkHub is a modern "link-in-bio" social media aggregator application that allows users to create beautiful profile pages showcasing all their social media links in one place. Built with React, Express, and PostgreSQL, it provides a clean, responsive interface for managing and displaying social media profiles with customizable themes and interactive elements.

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
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful endpoints for user profiles and social link management
- **Development**: ESBuild for server bundling and production deployment

### Database Schema
- **Users Table**: Stores profile information (username, display name, bio, profile picture, social stats)
- **Social Links Table**: Manages platform-specific links (Instagram, Twitter, LinkedIn, etc.)
- **ORM**: Drizzle ORM configured for PostgreSQL with schema validation using Zod

### Theme System
- **Multi-theme Support**: Light, dark, and gradient themes with CSS custom properties
- **Dynamic Switching**: Client-side theme persistence with localStorage
- **Component Integration**: Theme-aware components using context API

### UI/UX Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Interactive Elements**: Hover effects, click animations, and smooth transitions
- **Social Platform Integration**: Pre-configured styling for major social platforms
- **Share Functionality**: Native web share API with clipboard fallback
- **Toast Notifications**: User feedback for actions like copying links

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
- **Nanoid**: Unique ID generation
- **CMDK**: Command palette component integration