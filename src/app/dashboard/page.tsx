"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const quickLinks = [
    { href: "/grades", icon: "📚", title: "Browse Subjects", desc: "Explore all topics" },
    { href: "/ask", icon: "🤖", title: "Ask AI", desc: "Get instant answers" },
    { href: "/quiz", icon: "📝", title: "Take a Quiz", desc: "Test your knowledge" },
    { href: "/leaderboard", icon: "🏆", title: "Leaderboard", desc: "See rankings" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          {user.grade ? `Grade ${user.grade} Student` : "Student"} • Keep up your learning streak!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Streak", value: `${user.streak}🔥`, color: "from-orange-500 to-red-500" },
          { label: "Grade", value: user.grade || "—", color: "from-blue-500 to-indigo-500" },
          { label: "Quizzes", value: "0", color: "from-green-500 to-emerald-500" },
          { label: "Bookmarks", value: "0", color: "from-purple-500 to-pink-500" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 text-center"
          >
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-border bg-card p-5 card-hover text-center"
            >
              <div className="text-3xl mb-3">{link.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{link.title}</h3>
              <p className="text-xs text-muted-foreground">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      {user.grade && (
        <div>
          <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "English", slug: "english", icon: "📖", color: "from-blue-500 to-indigo-600" },
              { name: "Physics", slug: "physics", icon: "⚡", color: "from-amber-500 to-orange-600" },
              { name: "Chemistry", slug: "chemistry", icon: "🧪", color: "from-green-500 to-emerald-600" },
              { name: "Biology", slug: "biology", icon: "🧬", color: "from-purple-500 to-pink-600" },
            ].map((subject) => (
              <Link
                key={subject.slug}
                href={`/grade/${user.grade}/${subject.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden card-hover"
              >
                <div className={`h-1.5 bg-gradient-to-r ${subject.color}`}></div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <p className="text-xs text-muted-foreground">Grade {user.grade}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
