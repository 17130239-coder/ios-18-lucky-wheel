# iOS 18 Lucky Wheel (Tech Lucky Wheel)

A high-performance, responsive Lucky Wheel application designed according to Apple iOS 18 Liquid Glassmorphism design principles, connected to Stitch design **"iOS 18 Lucky Wheel"** (`projects/5082927756393735580`).

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Key Features

- 🎡 **Precision SVG Turntable Engine**:
  - Center coordinates $(300, 300)$ and radius $R = 280\text{px}$.
  - Exactly 10 sectors ($36^\circ$ each) with custom tech gadget colors and drop-shadow SVG badges.
  - Two-line high-contrast typography for maximum readability.
  - 10 perimeter metallic rivet pins and 30 outer polished rim LED bulbs.
- 🎯 **Realistic Physics & Collision Feedback**:
  - 5-second realistic decelerating spin using quartic easing: $1 - (1 - t)^4$.
  - Dynamic top needle pointer deflection ($-15^\circ$ bounce) upon crossing sector boundary pins.
  - Zero-latency procedural sound synthesizer via native browser **Web Audio API** (880Hz notch tick + 4-chord victory fanfare, no external audio files required).
- 🏆 **Celebratory Victory Experience**:
  - HTML5 Canvas particle confetti system with velocity decay and burst explosions.
  - Glassmorphic victory popover presenting the prize with "Nhận Quà" (Claim) and "Quay Tiếp" (Spin Again).
  - Spin history drawer tracking past awards with timestamps.
- ⚙️ **Prize Customization & Persistence**:
  - Slide-over glass drawer to customize all 10 prizes (Line 1, Line 2, Icon, Color).
  - Instant local storage synchronization and single-click "Mặc Định" reset to factory tech prizes.
- 🌓 **Dual iOS Theme Support**:
  - **Light Glass**: Warm Apple Titanium aesthetic with orange/amber accents.
  - **Dark Glass**: Liquid Specular Obsidian (`#08090C`) with Electric Violet and Cryo Cyan accents.

---

## 10 Flagship Tech Prizes

1. **iPhone 16 Pro Max** (`#FF6B00`)
2. **MacBook Pro M3** (`#1E293B`)
3. **iPad Pro M4** (`#0EA5E9`)
4. **Apple Watch Ultra 2** (`#10B981`)
5. **AirPods Max** (`#8B5CF6`)
6. **PlayStation 5** (`#F59E0B`)
7. **Loa Marshall** (`#EF4444`)
8. **Bàn Phím Cơ Custom** (`#059669`)
9. **Chuột MX Master 3S** (`#6366F1`)
10. **Củ Sạc Anker 140W** (`#D946EF`)

---

## Project Structure

```
ios-18-lucky-wheel/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with fonts & metadata
│   │   ├── page.tsx           # Master Lucky Wheel arena page
│   │   └── globals.css        # Tailwind & iOS 18 glassmorphic styling
│   ├── components/
│   │   ├── canvas/
│   │   │   └── ConfettiCanvas.tsx
│   │   ├── header/
│   │   │   └── Header.tsx     # Brand, theme toggle, audio toggle, settings trigger
│   │   ├── modals/
│   │   │   ├── VictoryModal.tsx
│   │   │   └── HistoryDrawer.tsx
│   │   ├── settings/
│   │   │   ├── SettingsDrawer.tsx
│   │   │   └── PrizeRowItem.tsx
│   │   └── wheel/
│   │       ├── AmbientGlow.tsx
│   │       ├── CenterHub.tsx  # 3D interactive center "QUAY" button
│   │       ├── LuckyWheel.tsx # Main wheel stage assembly
│   │       ├── PointerNeedle.tsx
│   │       ├── StatusPill.tsx
│   │       └── WheelSvg.tsx   # SVG turntable renderer
│   ├── constants/
│   │   ├── defaultPrizes.ts
│   │   └── techIcons.tsx      # Scalable SVG tech icons
│   ├── hooks/
│   │   ├── useConfetti.ts
│   │   ├── useLuckyWheel.ts   # Rotation math, easing & collision detection
│   │   ├── usePrizeStore.ts   # LocalStorage state management
│   │   └── useSoundEffects.ts # Web Audio synthesis
│   ├── types/
│   │   └── wheel.ts
│   └── utils/
│       ├── audio.ts           # Web Audio API engine
│       └── geometry.ts        # SVG sector trigonometrics & easing
```

---

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```bash
npm run build
npm run start
```
