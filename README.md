# Kinetic Monograph
> A portfolio that behaves like a living document.

Structure dissolves into motion.  
Technical decisions become visible gestures.  
**This is not a landing page. It is a designed experience.**

---

## ✦ Concept
Kinetic Monograph reimagines the portfolio as an editorial system. Instead of grids and cards, it operates through:

* **Motion as structure**
* **Typography as architecture**
* **Space as hierarchy**
* **Code as authorship**

The interface behaves like a publication in motion — where layout shifts, type performs, and engineering becomes visible.

---

## ✦ Design Philosophy

### 01 — Visual Language
* **Typographic architecture** — type divides space
* **Palette**: 
    * Ink Black `#0A0A0A`
    * Paper White `#FAFAF8`
    * Deep Cyan Accent `#0A7E8C`
* **Grid**: Broken 12-column asymmetric grid
* **Style**: Hard edges only — no gradients, no shadows. Intentional overlaps.

**Minimal palette. Maximum intention.**

### 02 — Typography
| Role | Typeface |
| :--- | :--- |
| **Display** | Clash Display (Fontshare) |
| **Body** | Satoshi (Fontshare) |
| **Technical** | JetBrains Mono |

*Editorial scale. Technical precision.*

---

## ✦ Motion System
A three-layer choreography.

### 1 — Structure Motion
*GSAP + ScrollTrigger*
* Pinned sections & Horizontal scroll galleries
* Scroll-scrubbed timelines
* Layout reconfiguration at boundary transitions
* *Motion defines architecture.*

### 2 — Content Motion
*motion.dev*
* Spring-based reveals & Staggered character animation
* Shared layout transitions
* Physics-based hover interactions
* *Soft movement inside rigid structure.*

### 3 — Micro Motion
*CSS + motion.dev*
* Cursor-aware distortion
* Velocity-based typography warping
* Real-time decay systems
* *Subtle. Reactive. Authored.*

---

## ✦ Structure

* **01 — Index**: Full-screen typographic entry. 3D perspective text animation. Scroll indicator functioning as timeline scrubber.
* **02 — Selected Works**: Pinned horizontal scroll gallery. Visual presentation, stack details, and implementation breakdown.
* **03 — Systems Thinking**: Live Canvas node visualization. Real-time connections and interactive physics.
* **04 — Motion Studies**: Experimental typographic distortion. Cursor velocity tracking and real-time rendering.
* **05 — Colophon**: Dark-mode closure. Stack as poetry and minimalist finish.

---

## ✦ Technical Architecture

```text
app/
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── CustomCursor.tsx
├── ScrollProgress.tsx
├── Index.tsx
├── Works.tsx
├── Systems.tsx
├── MotionStudies.tsx
└── Colophon.tsx
