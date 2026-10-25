# 🛒 বাজার দর 

**আজকের বাজারের দাম এক নজরে**
Track daily essential commodity prices across Bangladesh's markets, in Bangla.

🌐 Live Demo https://bazar-dor-ph-b14-a7.netlify.app

# 📖 About

**BazarDor (বাজার দর)** is a fully Bangla web app that shows the daily prices of
essential items such as rice, lentils, oil, vegetables, fish, meat, eggs and
spices. You can see what got more expensive or cheaper today, compare prices
across markets in different divisions, and browse everything by category.

## 🛠️ Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components, Suspense) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS, daisyUI |
| Authentication | Better Auth (Email/Password, Google, GitHub) |
| Database | MongoDB Atlas |
| Notifications | react-toastify |
| Font | Hind Siliguri (Bangla) |
| Data | BazarDor REST API |
| Deployment | Netlify |

# ✨ Key Features

1. **📈 Live Price Ticker**
   A scrolling marquee at the top of every page shows each product's current price with a ▲ / ▼ percentage change.

2. **🔺🔻 Today's Price Movers**
   Dedicated sections highlight the top 6 products whose prices increased and decreased today, plus a full list of all products.

3. **🗂️ Category Browsing & Sorting**
   Browse products by category (চাল, ডাল, তেল, সবজি, মাছ, মাংস and more) and sort by price or by the size of the change.

4. **🏪 Market-wise Price Comparison**
   Each product page shows the lowest, highest and average price, with a table of prices across markets and divisions.

5. **🔐 Authentication & Profile**
   Sign up and sign in with email/password, Google or GitHub. Product pages and the profile page are protected, and users can update their name.

> All numbers, dates and units are localized to Bangla (e.g. `১২০ টাকা/কেজি`).

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # Better Auth route handler
│   ├── category/[slug]/     # Category page with sorting
│   ├── product/[slug]/      # Product detail page
│   ├── profile/             # User profile
│   ├── signin/  signup/     # Auth pages
│   ├── components/          # Header, Markquee, HeroSection, Footer ...
│   ├── layout.tsx
│   └── page.tsx             # Home page
├── lib/
│   ├── auth.ts              # Better Auth server config
│   └── auth-client.ts       # Better Auth client
└── proxy.ts                 # Route protection
```



## 👨‍💻 Author

**M Naim Zomaddar**
GitHub: [@mdnaimzomaddar](https://github.com/mdnaimzomaddar)

🌐 Live Demo https://bazar-dor-ph-b14-a7.netlify.app