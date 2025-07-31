# Popup System Implementation Guide

A comprehensive guide for implementing a modular popup system with API integration using Easy Popup library.

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [File Structure](#file-structure)
- [Components](#components)
- [Problems & Solutions](#problems--solutions)
- [Usage Examples](#usage-examples)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This popup system provides:
- ✅ **Modular components** for easy maintenance
- ✅ **API integration** ready for real data
- ✅ **Loading states** and error handling
- ✅ **TypeScript support** with full type safety
- ✅ **Responsive design** with custom styling

## 📦 Installation

### 1. Install Dependencies
```bash
npm install @viivue/easy-popup
```

### 2. Create File Structure
```
src/
├── components/PopupManager/
│   ├── PopupManager.tsx
│   ├── PopupContent.tsx
│   └── PopupStyle.css
├── services/
│   └── popupService.ts
├── hooks/
│   └── usePopupData.ts
└── types/
    └── global.d.ts
```

## 📁 File Structure

### Core Components

#### `src/components/PopupManager/PopupManager.tsx`
Main popup manager that handles initialization and provides hooks.

```tsx
import { PopupManager, usePopupManager } from '@/components/PopupManager/PopupManager'

// Add to your App.tsx
<PopupManager />
<PopupTestButtons />
```

#### `src/components/PopupManager/PopupContent.tsx`
Reusable content component with loading and error states.

```tsx
<PopupContent 
  title="Screen Information"
  description="Your description here"
  features={["Feature 1", "Feature 2"]}
  status={{ label: "Status", value: "Active", type: "success" }}
  loading={false}
  error={null}
/>
```

#### `src/services/popupService.ts`
API service layer for popup data management.

```tsx
// Mock data - replace with real API calls
const mockPopupData = {
  'screen-popup': {
    id: 'screen-popup',
    title: 'Main Screen Information',
    description: 'Interactive display information',
    features: ['4K Resolution', 'Touch Interface'],
    status: { label: 'Status', value: 'Active', type: 'success' }
  }
}
```

#### `src/hooks/usePopupData.ts`
Custom hook for data fetching with loading states.

```tsx
const { data, loading, error, refetch } = usePopupData('popup-id')
```

#### `src/types/global.d.ts`
TypeScript declarations for Easy Popup library.

```tsx
declare global {
  interface Window {
    EasyPopup: {
      init: (selector: string, options?: Record<string, unknown>) => void;
      get: (id: string) => {
        open: () => void;
        close: () => void;
        toggle: () => void;
      };
    };
  }
}
```

## 🔧 Components

### PopupManager
- **Purpose**: Initializes popup library and manages popup instances
- **Features**: Dynamic content loading, error handling, debugging logs

### PopupContent
- **Purpose**: Displays popup content with various states
- **Features**: Loading animations, error display, status indicators

### usePopupManager Hook
- **Purpose**: Provides popup control functions
- **Methods**: `openPopup()`, `closePopup()`, `togglePopup()`

### usePopupData Hook
- **Purpose**: Manages API data fetching
- **Returns**: `{ data, loading, error, refetch }`

## 🚨 Problems & Solutions

### Problem 1: SVG Import Error
```
Error: InvalidCharacterError: Failed to execute 'createElement' on 'Document'
```

**Solution:**
```tsx
// ❌ Wrong
import IconGitHub from "../../public/assets/icons/github-mark.svg";

// ✅ Correct
import IconGitHub from "../assets/icons/github-mark.svg";
```

### Problem 2: MUI Theme Color Error
```
Error: MUI: Unsupported color
```

**Solution:**
```tsx
const getCssVariable = (name: string): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || '#ffb70b'; // Add fallback
}
```

### Problem 3: CSS @apply Error
```
Error: Unknown at rule @apply
```

**Solution:**
```css
/* ✅ Correct - In CSS file */
@layer components {
  .my-class {
    @apply text-white;
  }
}

/* ❌ Wrong - In SCSS file */
.my-class {
  @apply text-white;
}
```

### Problem 4: TypeScript Declaration Error
```
Error: Could not find a declaration file for module '@viivue/easy-popup'
```

**Solution:**
Create `src/types/global.d.ts`:
```tsx
declare global {
  interface Window {
    EasyPopup: {
      init: (selector: string, options?: Record<string, unknown>) => void;
      get: (id: string) => {
        open: () => void;
        close: () => void;
        toggle: () => void;
      };
    };
  }
}
```

### Problem 5: Popup Not Opening
**Solution:**
1. Use static import instead of dynamic:
```tsx
// ✅ Correct
import "@viivue/easy-popup"

// ❌ Wrong
await import("@viivue/easy-popup")
```

2. Use correct theme:
```tsx
window.EasyPopup.init('[data-easy-popup]', {
  theme: 'default', // Not 'right-side'
  // ... other options
})
```

## 💡 Usage Examples

### Basic Usage
```tsx
import { usePopupManager } from '@/components/PopupManager/PopupManager'

const MyComponent = () => {
  const { openPopup } = usePopupManager()
  
  return (
    <button onClick={() => openPopup('screen-popup')}>
      Open Popup
    </button>
  )
}
```

### Custom Popup Content
```tsx
import { PopupContent } from '@/components/PopupManager/PopupContent'

const CustomPopup = () => (
  <PopupContent
    title="Custom Title"
    description="Custom description"
    features={["Feature 1", "Feature 2"]}
    status={{ label: "Status", value: "Online", type: "success" }}
  />
)
```

### API Integration
```tsx
import { usePopupData } from '@/hooks/usePopupData'

const ApiPopup = () => {
  const { data, loading, error } = usePopupData('popup-id')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <PopupContent
      title={data?.title}
      description={data?.description}
      features={data?.features}
      status={data?.status}
    />
  )
}
```

## 🔌 API Integration

### Replace Mock Data with Real API

In `src/services/popupService.ts`:

```tsx
export class PopupService {
  static async getPopupData(popupId: string): Promise<PopupData> {
    const response = await fetch(`/api/popups/${popupId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch popup data');
    }
    return response.json();
  }
}
```

### Add New Popup

1. Add popup ID to array:
```tsx
const popupIds = ['screen-popup', 'screen001-popup', 'new-popup'];
```

2. Add data to service:
```tsx
const mockPopupData = {
  'new-popup': {
    id: 'new-popup',
    title: 'New Popup',
    description: 'New popup description',
    features: ['New Feature'],
    status: { label: 'Status', value: 'Ready', type: 'info' }
  }
}
```

## 🛠️ Troubleshooting

### Popup Not Opening
1. Check browser console for errors
2. Verify `window.EasyPopup` exists
3. Ensure popup elements have `data-easy-popup` attribute
4. Check if library is properly imported

### TypeScript Errors
1. Ensure `src/types/global.d.ts` exists
2. Check import paths are correct
3. Restart TypeScript server if needed

### Styling Issues
1. Verify `PopupStyle.css` is imported
2. Check CSS specificity conflicts
3. Ensure Tailwind classes are in `@layer components`

### API Errors
1. Check network requests in browser dev tools
2. Verify API endpoints are correct
3. Handle errors gracefully in components

## 🎨 Customization

### Styling
Edit `src/components/PopupManager/PopupStyle.css`:
```css
.easy-popup {
  font-family: 'Georgia', serif !important;
  /* Add your custom styles */
}
```

### Themes
Change popup theme in `PopupManager.tsx`:
```tsx
window.EasyPopup.init('[data-easy-popup]', {
  theme: 'default', // or 'corner', 'slide'
  // ... other options
})
```

### Animation
Add custom animations in CSS:
```css
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

## 📚 Key Concepts

### Import Types
- **Static**: `import "library"` - Loads immediately
- **Dynamic**: `await import("library")` - Loads on demand

### CSS Organization
- Tailwind `@apply` only works in CSS files
- Must be inside `@layer components`

### TypeScript Best Practices
- Global types go in `src/types/global.d.ts`
- Use `@ts-expect-error` with descriptions
- Avoid `@ts-ignore` when possible

## 🚀 Next Steps

1. **Connect to real API** - Replace mock data
2. **Add more popups** - Extend popup IDs array
3. **Customize styling** - Modify PopupStyle.css
4. **Add animations** - Implement custom transitions
5. **Error boundaries** - Add React error boundaries
6. **Testing** - Add unit tests for components

---

**Happy coding! 🎉**
