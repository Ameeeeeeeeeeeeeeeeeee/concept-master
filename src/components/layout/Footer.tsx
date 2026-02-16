import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Concept</span>Master
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-powered learning platform for Ethiopian high school students. Master your subjects with smart explanations and practice.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Subjects</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/grade/9/english" className="hover:text-foreground transition-colors">📖 English</Link></li>
              <li><Link href="/grade/9/physics" className="hover:text-foreground transition-colors">⚡ Physics</Link></li>
              <li><Link href="/grade/9/chemistry" className="hover:text-foreground transition-colors">🧪 Chemistry</Link></li>
              <li><Link href="/grade/9/biology" className="hover:text-foreground transition-colors">🧬 Biology</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/ask" className="hover:text-foreground transition-colors">Ask AI</Link></li>
              <li><Link href="/quiz" className="hover:text-foreground transition-colors">Take Quiz</Link></li>
              <li><Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link href="/grades" className="hover:text-foreground transition-colors">All Grades</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 ConceptMaster. Built for Ethiopian students 🇪🇹
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Optimized for low bandwidth</span>
            <span>•</span>
            <span>Mobile-first</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
