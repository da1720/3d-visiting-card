# Interactive 3D Visiting Card - Feature Roadmap

This document outlines potential new features and improvements for the 3D visiting card application, serving as a task list and brainstorming board for future developments.

## 🌟 New Features to Add

### 1. Advanced Exports & Sharing
- **Image Export (PNG/JPG):** Take a high-resolution screenshot of the 3D card exactly as it is angled.
- **PDF Generation:** Export a printable, two-sided business card format.
- **VCard (.vcf) Integration:** Allow users to download a standard contact format directly from the card.
- **Working QR Code:** Replace the currently static QR code button to dynamically generate a QR code linking to the user's digital portfolio or VCard.

### 2. Enhanced 3D Personalization
- **Custom Logos / 3D Objects:** Upload an SVG or `.glb`/`.gltf` file to appear as a floating emblem or embossed logo on the card.
- **Custom Background Textures:** Allow uploading images to be used as the base texture of the card instead of just CSS noise/gradients.
- **Card Shapes:** Offer different aspect ratios (Square, Slim, ID Badge).

### 3. Interactivity & Animations
- **Entrance Animations:** Have the card drop from above, unfold, or flip elegantly when the website first loads.
- **Interactive Hover Effects:** Make clicking or hovering over social links (LinkedIn, Email) spark a little particle explosion or glow.
- **Audio Effects:** Add premium, subtle UI sound effects for when the card flips or when colors are changed.

### 4. User Accounts & App Infrastructure
- **Real Database Integration:** Connect Google Sign-In to Firebase or Supabase to actually save users' card designs.
- **User Dashboard:** Allow a single user to create, save, and manage multiple cards for different contexts (e.g., one for Tech, one for Freelance).
- **View Analytics:** Track how many people opened your exported HTML card or clicked your links.

---

## 🚀 Improvements to Existing Features

### 1. Typography & Styling Controls
- **Granular Text Scaling:** Right now text scaling is global. Allow independent font size scaling for Name, Title, and Description.
- **More Font Options:** Integrate a font picker that pulls from the entire Google Fonts library dynamically.
- **Independent Themes:** Allow the front and the back of the card to have completely different colors or materials.

### 2. Layout & Positioning
- **Drag and Drop Interface:** Instead of using sliders to set X and Y positions for icons, allow users to literally click and drag elements around the 3D card.
- **Snap-to-Grid System:** Ensure dragging elements stays perfectly aligned.

### 3. HTML Export Utility
- **Embedded WebGL Export:** Upgrade the `exportCardHtml.ts` utility to compile a standalone single-file React/Three.js bundle so the downloaded HTML is fully 3D and interactive offline, rather than a CSS approximation.
- **Responsive HTML Export:** Further enrich the exported HTML/CSS card so it transforms into a multi-section digital portfolio layout on mobile devices.

### 4. Performance & UX Optimization
- **Undo / Redo History:** Let users undo accidental color or text changes effortlessly.
- **Device Optimization:** Add a "Performance Mode" toggle to disable heavy WebGL shadows and anti-aliasing on low-end mobile devices to preserve battery life.
- **Loading Screen:** Add a premium loader while the Three.js canvas and fonts are fetching over the network.
