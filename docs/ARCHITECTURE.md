# GreenPlate App Architecture

## Overview

GreenPlate is a cross-platform application for vegetarian and vegan recipes, built with a modern, modular architecture that separates core business logic from platform-specific implementations. This architecture enables code sharing between web and mobile platforms while maintaining platform-specific optimizations.

## Core Architecture Principles

1. **Separation of Concerns**: Business logic, data handling, and UI are cleanly separated
2. **Platform Agnosticism**: Core business logic has no platform dependencies
3. **Thin Platform Wrappers**: Platform-specific code is minimal and focused on platform features
4. **Shared UI Components**: Where possible, UI components are shared across platforms
5. **Single Source of Truth**: State management is centralized and consistent

## Folder Structure

```bash
src/
├── core/                   # Platform-agnostic business logic
│   ├── constants/          # Application constants and configuration
│   ├── contexts/           # React contexts for global state
│   ├── hooks/              # Custom React hooks for business logic
│   ├── models/             # Data models and type definitions
│   ├── services/           # Business services
│   └── utils/              # Utility functions
│
├── platforms/              # Platform-specific implementations
│   ├── web/                # Web platform
│   │   ├── adapters/       # Platform-specific adapters (storage, etc.)
│   │   ├── components/     # Web-specific React components
│   │   ├── hooks/          # Web-specific hooks (e.g., URL handling)
│   │   ├── pages/          # Web page components
│   │   └── styles/         # Web-specific styles
│   │
│   └── native/             # Mobile platform (future)
│       ├── adapters/       # Native adapters (AsyncStorage, etc.)
│       ├── components/     # Native-specific React components
│       ├── hooks/          # Native-specific hooks (navigation, etc.)
│       ├── screens/        # Native screens
│       └── styles/         # Native-specific styles
│
├── shared/                 # Cross-platform shared components
│   └── components/         # Shared UI components
│
├── data/                   # Data files and mock data
│
└── assets/                 # Static assets (images, fonts, etc.)


```
## Key Components

### Core Layer

The core layer contains all platform-agnostic business logic:

#### 1. Services

Services handle data operations and external interactions:

- **recipeService**: Manages recipe data operations
- **ingredientService**: Handles ingredient-specific operations
- **filterService**: Provides filtering logic for recipes
- **urlService**: Handles URL parameter management (abstract interface)

#### 2. Hooks

Custom hooks encapsulate business logic:

- **useRecipes**: Main hook for recipe data and filtering
- **useMealTime**: Manages meal time selection and detection
- **useRecipeDetail**: Handles individual recipe data loading
- **useIngredientFilter**: Manages ingredient filtering logic
- **useAppState**: Centralizes application state management
- **useFavoritesPage**: Manages favorites page state and data
- **useHomePageContent**: Handles homepage-specific content logic

#### 3. Contexts

React contexts provide global state management:

- **FavoritesContext**: Manages user favorite recipes

#### 4. Models

Data models define consistent structures:

- **Recipe**: Recipe data structure and methods
- **Favorites**: Favorites collection with management methods

### Platform Layer

Platform-specific implementations that leverage the core layer:

#### Web Platform

- **components/**: React components for web UI
- **hooks/useWebNavigation**: Web-specific navigation using React Router
- **adapters/**: Web platform adapters (localStorage, etc.)

#### Native Platform (Future)

- **components/**: React Native components
- **hooks/useNativeNavigation**: Native navigation using React Navigation
- **adapters/**: Native platform adapters (AsyncStorage, etc.)

### Shared Layer

Components that can be used across platforms with minimal modification:

- **SearchBar**: Cross-platform search input
- **DietFilter**: Diet type selection component
- **IngredientFilter**: Ingredient filtering component
- **FavoriteButton**: Button for favoriting recipes
- **RecipeCardView**: Presentational component for recipe cards

## Data Flow

1. **State Management**:
   - Core hooks manage application state
   - Context provides global state where needed
   - Platform components use hooks to access state

2. **User Interactions**:
   - Platform components capture user inputs
   - Inputs are passed to core hooks and services
   - Core layer processes business logic
   - Updated state flows back to components for rendering

3. **Navigation**:
   - Platform-specific navigation (React Router or React Navigation)
   - Core hooks provide data needed for navigation
   - Platform adapters abstract navigation differences

## Cross-Platform Strategy

### Code Sharing

- Core business logic is shared between platforms (80-90% code reuse)
- Platform-specific code is isolated to adapter patterns
- UI components are implemented separately per platform but follow the same data patterns

### Platform Adapters

Adapters provide consistent interfaces for platform-specific functionality:

- **Storage**: localStorage (Web) vs AsyncStorage (Native)
- **Navigation**: React Router (Web) vs React Navigation (Native)
- **Styling**: CSS (Web) vs StyleSheet (Native)

## Styling Approach

### Web

- CSS modules for component styling
- Global CSS variables for theming
- Responsive design using media queries

### Native (Future)

- React Native StyleSheet
- Theme providers for consistent styling
- Platform-specific adjustments where needed

## Testing Strategy

1. **Core Layer**:
   - Unit tests for services and utilities
   - Integration tests for hooks and contexts
   - Mock adapters for platform dependencies

2. **Platform Layer**:
   - Component tests for UI rendering
   - End-to-end tests for user flows
   - Platform-specific integration tests

## Future Architectural Considerations

1. **State Management**: As the application grows, consider Redux or MobX for more complex state
2. **API Integration**: Add a data layer for backend API communication
3. **Authentication**: Add user authentication and authorization
4. **Offline Support**: Implement offline data persistence and synchronization
5. **Performance Optimization**: Add virtualization for large lists, lazy loading, etc.

## Development Workflow

1. Implement core business logic first
2. Create platform-specific components that use core logic
3. Test across platforms to ensure consistent behavior
4. Refine platform-specific implementations for optimal UX

## Deployment Architecture

### Web

- Static site hosting on Vercel
- Client-side routing with React Router
- Progressive Web App capabilities

### Mobile (Future)

- App Store and Google Play distribution
- React Native for cross-platform mobile
- Native modules for platform-specific features

## Conclusion

This architecture enables GreenPlate to maintain a consistent user experience and feature set across platforms while optimizing for each platform's unique capabilities. By separating core business logic from platform-specific code, we achieve high code reuse while preserving the ability to create tailored experiences for each platform.