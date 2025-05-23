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

### 2025-05-22 
## Phase 3: Complete Core Layer
Examined the remaining platform components to ensure they're truly just thin wrappers around core logic.

Looking at your remaining src/platforms/web/components/:

Header.jsx - Navigation with React Router
Footer.jsx - Footer navigation
RecipeCard.jsx - Container for RecipeCardView
RecipeDetail.jsx - Recipe detail with routing logic

## Remove unused files and folders
## Moved pure components to src/shared/components folder

### 2025-05-21 Migration Steps Summary

## Fix issues 
### Summary of Changes

The main issue was in the data flow between your hooks. Here's what I fixed:

AppContent.jsx:

Now properly passes the current timeOfDay from useMealTime to useRecipes(timeOfDay)
Added loading and error handling states
Fixed the page heading logic


useRecipes.js:

Changed parameter name from initialTimeOfDay to currentTimeOfDay for clarity
Removed internal timeOfDay state management (since it's managed by useMealTime)
Uses the passed currentTimeOfDay parameter directly in the filtering effect
Returns the current timeOfDay parameter in the hook's return object

## Create Backup and New Branch
```bash
# Create backup
git add .
git commit -m "Pre-refactor backup - current working state"
git push origin main

# Create new branch for refactoring
git checkout -b cross-platform-refactor
## Create the new folder structure
```

## Create New Folder Structure

```bash
# Create core folders
mkdir -p src/core/services
mkdir -p src/core/hooks  
mkdir -p src/core/contexts
mkdir -p src/core/models
mkdir -p src/core/utils

# Create platform folders
mkdir -p src/platforms/web/components
mkdir -p src/platforms/web/pages
mkdir -p src/platforms/web/styles
mkdir -p src/platforms/web/adapters
mkdir -p src/platforms/web/hooks

# Create shared folders
mkdir -p src/shared/components

# Future native folder (don't create yet)
# mkdir -p src/platforms/native/...
```

## Move Existing Files
``` bash
# Copy services to core
cp -r src/services/* src/core/services/

# Copy contexts to core  
cp -r src/context/* src/core/contexts/

# Copy hooks to core (we'll refactor these)
cp -r src/hooks/* src/core/hooks/

# Copy CSS to web platform
cp -r src/css/* src/platforms/web/styles/

# Copy components to web platform
cp -r src/components/* src/platforms/web/components/
```

## Update Main CSS Import
Update src/platforms/web/styles/main.css to have the correct import paths:

## Update App.jsx Import
Update src/App.jsx to import from the new location

## Update AppContent.jsx Imports
Copy existing src/components/AppContent.jsx to src/platforms/web/components/AppContent.jsx and update all imports

## Create Web Pages Folder
Move your FavoritesPage to the new location:

``` bash
mkdir -p src/platforms/web/pages
cp src/components/pages/FavoritesPage.jsx src/platforms/web/pages/
```

## Test Current State
```
npm run dev
```

At this point, app should still work exactly as before, but with the new folder structure.

### 2025-05-17 Areas for Further Improvement

#### 1. Create a more comprehensive service layer

#### 2. Enhanced Custom Hooks
Refactor hooks for better platform independence

#### 3. Create Platform-Agnostic Models
Define clear data models for consistency

#### 4. Separates UI Components into Presentational and Container Components

#### 5. Created Adapter Pattern for Platform-Specific Storage

#### 6. Created a Shared Styling System

#### 7. Created an Interface Adapter for Navigation

### 2025-05-17 Fix search bar where we had to press backspace again to remove the first character
Remove URL updates for search terms

### 2025-05-17 Fix a bug on Ingredients Filter component
When user selected the checkbox of ingredients the url would also update and the entire page would go in a loop crashing the browser eventually.

Fix was to not update the URL which prevents a circular loop

### 2025-05-16 Fix a bug on SearchBar and add Favorites page
Search Bar still had issues wherein if user clicked on links in footer or on any other card the selection would not take place.

Also added a Favorites page and an option to mark a favorite recipe

### 2025-05-16 Fix a bug on SearchBar
User was not able to select the 'Search Ingredient' input area since SearchBar input always had focus

Highlights of the fix
- Keep the main search bar focused for most interactions (maintaining our desired UX)
- Allow users to deliberately click on the ingredient filter input and have it properly receive focus
- Do this without requiring significant changes to our existing code structure

### 2025-05-16: Refactored code 
- To properly decouple the UI and business logic. 
- Keeping React Native in mind. 
- Since we want to create a react Native App also and want to ensure we can share business logic part of the web app. 

#### Test the Changes
After making these changes:

- Check if the app loads correctly
- Test the filtering functionality
- Ensure URL parameters work
- Test navigating to recipe detail and back

### 2025-05-15: Initial Setup and Project Structure
- Created project with Vite and React
- Set up folder structure for components, layouts, and CSS
- Implemented recipe data in JSON format
- Created initial UI components (Header, RecipeCard)

### 2025-05-15: Recipe Filtering Functionality
- Implemented filtering by meal time (breakfast, lunch, snacks, dinner)
- Added diet filtering (vegetarian/vegan)
- Created search functionality
- Added ingredient filtering

### 2025-05-15: Navigation and Header
- Implemented header with navigation options
- Set up React Router for navigation
- Created recipe detail page
- Added responsive design for mobile and desktop

### 2025-05-15: Footer Implementation and Navigation Challenges
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

### 2025-05-15: Responsive Design Implementation
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

*Last Updated: May 15, 2025*