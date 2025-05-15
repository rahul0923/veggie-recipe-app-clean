# GreenPlate Recipe App Project Journal

## Project Overview
GreenPlate is a vegetarian and vegan recipe app built with React and Vite. It allows users to browse recipes filtered by meal time (breakfast, lunch, snack, dinner) and diet type (vegetarian, vegan).

## Tech Stack
- **Frontend**: React 19.1.0, React Router 7.5.3
- **Build Tool**: Vite 6.3.5
- **UI Components**: Custom components, HeroIcons
- **Styling**: CSS Modules
- **Data**: JSON file (local data, no backend currently)

## Architecture
- **App Structure**: Uses a container pattern with AppContent component for React Router hooks
- **State Management**: React hooks (useState, useEffect, useCallback)
- **URL Integration**: URL parameters reflect app state (meal, diet, search terms, ingredients)
- **Components**: Header, Footer, RecipeCard, RecipeDetail, etc.

## Development Journal

### 2024-05-15: Initial Setup and Project Structure
- Created project with Vite and React
- Set up folder structure for components, layouts, and CSS
- Implemented recipe data in JSON format
- Created initial UI components (Header, RecipeCard)

### 2024-05-15: Recipe Filtering Functionality
- Implemented filtering by meal time (breakfast, lunch, snacks, dinner)
- Added diet filtering (vegetarian/vegan)
- Created search functionality
- Added ingredient filtering

### 2024-05-15: Navigation and Header
- Implemented header with navigation options
- Set up React Router for navigation
- Created recipe detail page
- Added responsive design for mobile and desktop

### 2024-05-15: Footer Implementation and Navigation Challenges
**Issue**: Footer navigation links didn't update app state or URL.

**Solution**:
1. Restructured app to use a separate AppContent component for React Router hooks to ensure proper context
2. Replaced Link components with simple div elements with onClick handlers
3. Standardized navigation pattern between Header and Footer
4. Ensured props names matched between parent and child components

**Key Learnings**:
- React Router hooks must be used within Router context
- Simple DOM elements can be more reliable than Links for complex interactions
- Consistent prop naming is essential for component communication

### 2024-05-15: Responsive Design Implementation
- Added media queries for different viewport sizes
- Created mobile menu toggle
- Implemented responsive grid for recipe cards
- Fixed CSS issues with footer and search bar on mobile

## Deployment Plans
- Planning to deploy on Vercel
- Need to create a proper favicon
- Add vercel.json file for proper routing configuration
- Set up continuous deployment from GitHub

## Future Plans
1. Convert to mobile app using React Native or Capacitor
2. Add user authentication
3. Implement database backend
4. Add recipe saving functionality
5. Introduce user reviews and ratings

## Technical Debt & Known Issues
- Footer styling needs refinement in mobile view
- AppContent structure may benefit from state management library as app grows
- Consider converting CSS to styled-components or Tailwind
- Test coverage needed

## Development Setup
1. Clone repository
2. Run `npm install`
3. Start development server with `npm run dev`
4. Access app at `http://localhost:5173/`

---

*Last Updated: May 15, 2024*