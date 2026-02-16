# 🎓 ConceptMaster - AI-Powered Educational Platform

**ConceptMaster** is a cutting-edge, AI-powered learning platform designed for high school students in Ethiopia (Grades 9–12). It helps students master complex concepts in English, Physics, Chemistry, and Biology through interactive explanations, smart quizzes, and personalized learning.

The platform is optimized for low-bandwidth environments, mobile experiences, and fast loading.

---

## 🚀 Key Features

### 1️⃣ Grade-Based Navigation

- **Dynamic Routing**: Structure based on `Grade -> Subject -> Topic -> Concept`.
- **Comprehensive Coverage**: Includes Grades 9-12 and all four core subjects.

### 2️⃣ AI Concept Explainer (Google Gemini)

- **Instant Understanding**: Get simple explanations, real-life examples, and key formulas.
- **Interactive Tools**: Request "Simpler Explanation", "Exam Tips", "Practice Questions", or "Summary".
- **Streaming Responses**: Fast, real-time AI generation.

### 3️⃣ Ask Anything (Global AI Search)

- **Universal Search**: Ask any question about any supported subject.
- **Smart Suggestions**: AI detects the subject and provides relevant answers.

### 4️⃣ Smart Quiz Generator

- **Dynamic Quizzes**: Create tests on any topic instantly.
- **Detailed Feedback**: Review answers with explanations for every option.
- **Progress Tracking**: Score history and performance analytics.

### 5️⃣ User Dashboard & Gamification

- **Personalized Home**: See your grade, streak, and quick links.
- **Leaderboard**: Compete with other students based on quiz performance.
- **Study Streak**: Stay consistent and track your daily learning.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, ShadCN UI
- **Backend**: Next.js App Router API Routes
- **Database**: PostgreSQL (Prisma ORM)
- **Caching**: Redis (Upstash / In-memory fallback)
- **AI**: Google Gemini API
- **Auth**: JWT (JSON Web Tokens) in HTTP-only cookies

---

## 📂 Project Structure

```
/
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   │   ├── api/          # Backend API endpoints
│   │   │   ├── ai/       # AI generation and chat
│   │   │   ├── auth/     # Login, Register, Logout
│   │   │   └── quiz/     # Quiz generation
│   │   ├── dashboard/    # User dashboard
│   │   ├── grade/        # Dynamic grade/subject/topic routes
│   │   └── ...           # Other pages (Home, Login, etc.)
│   ├── components/       # Reusable UI components
│   │   ├── ai/           # AI-specific components
│   │   ├── layout/       # Navbar, Footer
│   │   ├── quiz/         # Quiz generator and viewer
│   │   └── ui/           # Generic UI elements (Skeleton, etc.)
│   ├── hooks/            # Custom React hooks (useAuth, useAI)
│   ├── lib/              # Utility functions and libraries
│   │   ├── auth.ts       # Authentication logic
│   │   ├── gemini.ts     # AI integration
│   │   ├── prisma.ts     # Database client
│   │   └── redis.ts      # Caching logic
│   └── types/            # TypeScript interfaces
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (Optional, falls back to memory)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/concept-master.git
   cd concept-master
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/conceptmaster"
   JWT_SECRET="your-super-secret-key"
   GEMINI_API_KEY="AIzaSy..."
   ```

4. **Initialize Database**:

   ```bash
   npx prisma db push
   ```

5. **Run Development Server**:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to start learning!

---

## 📦 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions on Vercel, Neon, and Upstash.

---

## 📝 License

MIT License. Built with ❤️ for Ethiopian Students.
