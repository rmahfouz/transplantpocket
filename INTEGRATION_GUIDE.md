# Quick Integration Guide for Landmark Studies

The LandmarkStudies component has been created in `src/components/LandmarkStudies.jsx`.

Now you just need to make 3 small changes to `src/App.jsx`:

## 1. Add Import (at the top, around line 14)

Add this line after the lucide-react imports:

```javascript
import LandmarkStudies from './components/LandmarkStudies';
import { BookOpen } from 'lucide-react';  // Add BookOpen to existing imports
```

So your imports look like:
```javascript
import React, { useState, useEffect } from 'react';
import {
Activity,
Shield,
Pill,
AlertTriangle,
Menu,
X,
Thermometer,
Calculator,
ArrowRight,
Info,
Scissors,
BookOpen  // ADD THIS
} from 'lucide-react';

import LandmarkStudies from './components/LandmarkStudies';  // ADD THIS LINE
```

## 2. Add Navigation Item (around line 820)

In the sidebar navigation, add this line:

```javascript
<NavItem id="studies" label="Studies" icon={BookOpen} />
```

Full context:
```javascript
<nav className="flex-1 overflow-y-auto p-4 space-y-2">
    <NavItem id="epidemiology" label="Epidemiology" icon={Activity} />
    <NavItem id="surgical" label="Surgical" icon={Scissors} />
    <NavItem id="immunology" label="Immunology" icon={Shield} />
    <NavItem id="pharma" label="Pharmacology" icon={Pill} />
    <NavItem id="rejection" label="Rejection" icon={AlertTriangle} />
    <NavItem id="infections" label="Infections" icon={Thermometer} />
    <NavItem id="studies" label="Studies" icon={BookOpen} />  {/* ADD THIS */}
</nav>
```

## 3. Add Content Rendering (around line 856)

In the main content area, add this:

```javascript
{activeSection === 'studies' &&
    <LandmarkStudies />}
```

Full context:
```javascript
{activeSection === 'epidemiology' &&
    <Epidemiology />}
{activeSection === 'surgical' &&
    <Surgical />}
{activeSection === 'immunology' &&
    <Immunology />}
{activeSection === 'pharma' &&
    <Pharmacology />}
{activeSection === 'rejection' &&
    <Rejection />}
{activeSection === 'infections' &&
    <Infections />}
{activeSection === 'studies' &&
    <LandmarkStudies />}  {/* ADD THIS */}
```

## That's it!

Save the file and the dev server will reload. You'll see:
- ✅ New "Studies" tab in sidebar
- ✅ 12 landmark trials with category filtering
- ✅ PICO format for each study
- ✅ Direct PubMed links

Much cleaner than editing the massive App.jsx file directly!
