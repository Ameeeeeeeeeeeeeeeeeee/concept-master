import Link from "next/link";
import { curriculumData } from "@/lib/curriculum-data";

export default function HomePage() {
  const grades = [9, 10, 11, 12];
  const subjects = [
    { name: "English", slug: "english", icon: "📖", color: "from-blue-500 to-indigo-600", bg: "bg-blue-500/10" },
    { name: "Physics", slug: "physics", icon: "⚡", color: "from-amber-500 to-orange-600", bg: "bg-amber-500/10" },
    { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "from-green-500 to-emerald-600", bg: "bg-green-500/10" },
    { name: "Biology", slug: "biology", icon: "🧬", color: "from-purple-500 to-pink-600", bg: "bg-purple-500/10" },
  ];

  const features = [
    { icon: "🧠", title: "AI Explanations", desc: "Get instant, simple explanations for any concept" },
    { icon: "📝", title: "Smart Quizzes", desc: "AI-generated MCQs to test your knowledge" },
    { icon: "🤖", title: "Ask Anything", desc: "Type any question and get a clear answer" },
    { icon: "🎯", title: "Exam Tips", desc: "Get targeted advice for exam preparation" },
    { icon: "📊", title: "Track Progress", desc: "Monitor your learning journey and scores" },
    { icon: "🏆", title: "Leaderboard", desc: "Compete with other students nationwide" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI-Powered Learning Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 animate-slide-up">
              Master Every
              <span className="gradient-text block sm:inline"> Concept</span>
              <br />
              with AI
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto animate-slide-up">
              The smartest way for Ethiopian high school students to learn English, Physics, Chemistry, and Biology. 
              Get AI explanations, practice quizzes, and exam tips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/grades" className="btn-primary text-base py-4 px-8">
                🚀 Start Learning
              </Link>
              <Link href="/ask" className="btn-secondary text-base py-4 px-8">
                🤖 Ask AI
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto">
              {[
                { value: "4", label: "Subjects" },
                { value: "4", label: "Grades" },
                { value: "150+", label: "Topics" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grades Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Choose Your Grade</h2>
          <p className="text-muted-foreground">Select your grade to explore subjects and topics</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {grades.map((grade, i) => (
            <Link
              key={grade}
              href={`/grade/${grade}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 card-hover"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
              <div className="text-4xl sm:text-5xl font-black gradient-text mb-3">{grade}</div>
              <h3 className="text-lg font-bold mb-2">Grade {grade}</h3>
              <p className="text-sm text-muted-foreground">
                {4} subjects • {curriculumData[i].subjects.reduce((acc, s) => acc + s.topics.length, 0)} topics
              </p>
              <div className="mt-4 flex gap-2">
                {subjects.map((s) => (
                  <span key={s.slug} className="text-lg" title={s.name}>
                    {s.icon}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Subjects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Explore Subjects</h2>
          <p className="text-muted-foreground">Deep dive into any subject across all grades</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.slug}
              className="group rounded-2xl border border-border bg-card overflow-hidden card-hover"
            >
              <div className={`h-2 bg-gradient-to-r ${subject.color}`}></div>
              <div className="p-6">
                <div className={`w-14 h-14 ${subject.bg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Available for Grades 9-12 with AI-powered explanations
                </p>
                <div className="flex flex-wrap gap-2">
                  {grades.map((g) => (
                    <Link
                      key={g}
                      href={`/grade/${g}/${subject.slug}`}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Grade {g}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why ConceptMaster?</h2>
          <p className="text-muted-foreground">Everything you need to excel in your studies</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 card-hover"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 p-8 sm:p-12 text-white text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Master Your Subjects?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join thousands of Ethiopian students using AI to learn smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-indigo-700 rounded-xl px-8 py-4 font-bold hover:bg-white/90 transition-all shadow-xl active:scale-95"
              >
                Create Free Account
              </Link>
              <Link
                href="/grades"
                className="border-2 border-white/30 text-white rounded-xl px-8 py-4 font-medium hover:bg-white/10 transition-all active:scale-95"
              >
                Browse Topics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
