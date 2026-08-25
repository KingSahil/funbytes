# FunBytes ⚡

> **“Your internet. Your interests. Your feed.”**

FunBytes is a high-performance, dark-mode first mobile feed application combining the fast-paced scrolling card interaction of **X/Twitter**, the topic personalization of **Google Discover**, the discussion depth of **Reddit**, and a modern meme/political cartoon visual feed.

---

## 📱 Features

- ⚡ **Personalized Topic Streams**: Real-time aggregation tailored to user interests (Developers, AI, Technology, Politics, Sports, Bollywood, International, Memes, Political Cartoons).
- 💻 **Developer Feed (Phase 1 MVP)**: Live & curated feeds from `r/developersIndia`, `Medium Developer Publications`, and `DevHumor`.
- 🎨 **Visual Feeds**: Dedicated swipeable/gallery feeds for **Dev Memes** and **Political Cartoons**.
- ❤️ **Interactive Engagements**: Optimistic likes, threaded multi-level comments, native Android share sheet, and categorized bookmarks.
- 🔍 **Global Discovery & Search**: Instant keyword search across articles, Reddit discussions, memes, topics, authors, and sources.
- 🚀 **Modular Ingestion Engine**: Pluggable source adapters (`ContentSource`) with deduplication, multi-source coverage badges, and AI summarization.
- 🎯 **Intelligent Ranking**: Replaceable scoring engine combining topic affinity, recency decay, viral engagement velocity, and content-type preferences.
- 🌙 **First-Class Dark Experience**: Luxury dark palette (`#090A0F`, `#12141D`, `#1A1D29`) with energetic electric violet (`#6366F1`) and cyan (`#00F5D4`) accents.
- 📴 **Offline Support**: Local caching with automatic offline notice and offline story reader.

---

## 🏗️ Architecture

```
funbytes/
├── apps/
│   └── mobile/             # React Native Expo Mobile App (Expo Router)
├── backend/                # Node.js TypeScript Aggregation API & Source Ingestion Engine
├── packages/
│   └── types/              # Shared TypeScript definitions & domain contracts
├── docs/                   # Complete architecture, API & system specifications
├── skills/                 # AI Agent operational & maintenance skills
└── tests/                  # Automated test suite
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- Expo Go app on Android/iOS (or Android Emulator)

### 1. Clone & Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install mobile dependencies
cd ../apps/mobile
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` in both `backend/` and `apps/mobile/`:
```bash
cp .env.example .env
```

### 3. Run the Backend API
```bash
cd backend
npm run dev
# Server starts at http://localhost:4000
```

### 4. Run the Mobile App (Expo)
```bash
cd apps/mobile
npm start
```
Scan the QR code with **Expo Go** or press `a` to launch in Android Emulator.

---

## 🧪 Testing

Run the comprehensive unit and integration test suite:
```bash
# Run all backend & domain tests
cd backend
npm test
```

---

## 📄 License
MIT © FunBytes Team
