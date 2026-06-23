# GlowSpot Hyderabad ✨

GlowSpot Hyderabad is a premium, startup-style beauty salon and grooming marketplace web application that connects beauty lovers with top-tier salons, grooming lounges, and mobile home beauty services across Hyderabad. 

Designed with rich aesthetics, smooth micro-animations, and client-side database persistence, the platform mimics a fully functional, funded startup product rather than a simple hackathon demonstration.

## 🚀 Live Link Placeholder
- **Production URL**: [GlowSpot Hyderabad Platform](https://glowspot-hyderabad.vercel.app) *(Deploy Ready)*

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18 + Vite (Scaffolded with Vite React template)
- **Styling & Transitions**: Tailwind CSS v3 utility classes + Custom keyframes & bezier easing for buttery smooth transitions
- **Navigation & Routing**: React Router DOM (Dynamic URL routing for detailed pages)
- **Icons**: Lucide React
- **State Management & Persistence**: React Context API (`BookingContext.jsx`) integrated with `localStorage` for complete persistence of bookings, loyalty points, user favorites, and verified reviews.

---

## 🤖 Smart AI Features

1. **GlowBot Style AI Recommender**: A floating AI styling consultant on the bottom right. Users can query custom styling needs (e.g., "I need a wedding bridal makeup package in Jubilee Hills" or "Recommend a relaxing massage in Gachibowli"), and the AI parses keywords to provide smart textual answers and direct booking CTA links.
2. **Smart Search Autocomplete Suggestions**: Typing in the Hero search bar triggers matching recommendations from an AI-based suggestions list (e.g. typing "bri..." highlights "Bridal Makeup", "Bridal Mehendi", and "Bridal Spa Package").
3. **AI Review Summarizer**: Every salon page utilizes simulated NLP summaries to distill over 100+ raw customer reviews into two sentences. This allows users to quickly understand the specialties of each salon (e.g., specific stylists, tea preferences, and detan details).

---

## 📂 Project Structure

```text
/glowspot-hyderabad
├── /client                 # Complete React Frontend Application
│   ├── /public             # Assets, icons, and configuration
│   ├── /src
│   │   ├── /components     # Reusable components (Navbar, Footer, AI StyleRecommender)
│   │   ├── /context        # Global state context for bookings & loyalty points
│   │   ├── /data           # Rich mock data (Hyderabad areas, salons, reviews, stylists)
│   │   ├── /pages          # Core views (Home, Listing, Details, Wizard Booking, Profile, Admin)
│   │   ├── App.jsx         # Root router & layout configuration
│   │   ├── index.css       # Tailwind configuration + Custom animations (fade-in, shimmers)
│   │   └── main.jsx        # App entry point
│   ├── tailwind.config.js  # Theme config (Rose #C2185B primary & Gold #F9A825 accent)
│   ├── postcss.config.js   # Autoprefixer & Tailwind configuration
│   ├── vite.config.js      # Vite build configurations
│   └── package.json        # Node dependency manifest
└── README.md               # Main project documentation (this file)
```

---

## 🔑 Core Features & Pages

1. **Frosted Glass Navbar**: Displays active page routes and live loyalty points balances.
2. **Interactive Hero & Category Navigation**: Multi-category selectors with smooth scaling transitions.
3. **Filterable Salon listing**: Left-sidebar filtering (Mobile drawer) allowing users to filter by Rating, Area (Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur, Begumpet), Category, and Price Range. Supports sorting by Rating, Distance, and Price.
4. **Detailed Salon Workspaces**: Immersive covers, stylist portfolios, date-time slots selector, average rating breakdown charts, and writing reviews.
5. **3-Step Wizard Booking**: Pre-populated service selection, interactive date/time picker, contact form validation (valid email pattern, 10-digit phone checking), and loyalty points cash discount redemption.
6. **Customer Dashboard**: Track upcoming bookings, past bookings history (with cancel/rebook capabilities), and a premium Gold/Silver/Bronze membership card displaying loyalty points.
7. **Admin Desk**: Marketplace KPI blocks (Revenue, Bookings, Active Partners), Partner list view, and an Add Partner form that immediately pushes new salons live to the listing views.

---

## 💻 Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Steps to Run
1. Navigate to the project client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (normally `http://localhost:5173`) in your browser to experience **GlowSpot Hyderabad**!
