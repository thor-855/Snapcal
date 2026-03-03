# 🚀 SnapCal — Smart Calorie Tracker

A premium, dark-mode calorie tracking PWA built with Python Flask. Track your daily food intake, monitor macros, view history charts, earn achievements, and compete on the leaderboard!

## ✨ Features

- 🔍 **Instant Food Search** — 100+ foods (Indian & Western cuisine)
- 📊 **Animated Dashboard** — Calorie ring, macro bars (protein, carbs, fat, fiber)
- 🎯 **Custom Goals** — Set and track daily calorie targets
- 📈 **History Charts** — Weekly & monthly bar charts with goal line
- 🏆 **Achievements** — Streak tracking & 8 unlockable badges
- 🏅 **Leaderboard** — Community rankings by streak & consistency
- 📱 **PWA** — Install on your phone like a real app
- 🌙 **Dark Mode** — Premium glassmorphic UI
- 💾 **Offline Ready** — Data persists in localStorage

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/SnapCal.git
cd SnapCal

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Open **http://localhost:5000** in your browser.

## 📱 Install as App (PWA)

1. Open in Chrome on your phone
2. Tap ⋮ menu → "Install app" or "Add to Home Screen"
3. Enjoy SnapCal as a standalone app!

## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Storage:** localStorage (no database needed)
- **PWA:** Service Worker + Web App Manifest

## 📁 Project Structure

```
SnapCal/
├── app.py              # Flask server & API routes
├── food_data.py        # Nutrition database (100+ foods)
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html      # Main page with PWA tags
└── static/
    ├── manifest.json   # PWA manifest
    ├── sw.js           # Service worker
    ├── icons/          # App icons
    ├── css/style.css   # Premium dark UI
    └── js/app.js       # Frontend logic + charts
```

## 📄 License

MIT License — feel free to use and modify!
