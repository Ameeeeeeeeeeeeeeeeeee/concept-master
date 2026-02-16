export const metadata = {
  title: "Leaderboard - ConceptMaster",
  description: "See top-performing students on ConceptMaster",
};

export default function LeaderboardPage() {
  // Mock leaderboard data - in production, this would come from the database
  const leaderboard = [
    { rank: 1, name: "Abebe K.", score: 2450, quizzes: 48, grade: 12, avatar: "🥇" },
    { rank: 2, name: "Hiwot M.", score: 2280, quizzes: 44, grade: 11, avatar: "🥈" },
    { rank: 3, name: "Dawit T.", score: 2150, quizzes: 42, grade: 10, avatar: "🥉" },
    { rank: 4, name: "Sara B.", score: 1980, quizzes: 38, grade: 12, avatar: "4" },
    { rank: 5, name: "Yonas A.", score: 1850, quizzes: 35, grade: 9, avatar: "5" },
    { rank: 6, name: "Frehiwot G.", score: 1720, quizzes: 33, grade: 11, avatar: "6" },
    { rank: 7, name: "Solomon H.", score: 1650, quizzes: 31, grade: 10, avatar: "7" },
    { rank: 8, name: "Bethlehem W.", score: 1580, quizzes: 29, grade: 12, avatar: "8" },
    { rank: 9, name: "Daniel Z.", score: 1490, quizzes: 27, grade: 9, avatar: "9" },
    { rank: 10, name: "Tigist R.", score: 1420, quizzes: 25, grade: 11, avatar: "10" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🏆</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top performing students this month. Take quizzes to earn points!
        </p>
      </div>

      {/* Top 3 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {leaderboard.slice(0, 3).map((entry, i) => (
          <div
            key={entry.rank}
            className={`rounded-2xl border border-border bg-card p-4 sm:p-6 text-center card-hover ${
              i === 0 ? "sm:-translate-y-2" : ""
            }`}
          >
            <div className="text-4xl mb-2">{entry.avatar}</div>
            <h3 className="font-bold text-sm sm:text-base truncate">{entry.name}</h3>
            <p className="text-xs text-muted-foreground">Grade {entry.grade}</p>
            <div className="mt-2 text-lg sm:text-xl font-bold gradient-text">
              {entry.score.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">{entry.quizzes} quizzes</p>
          </div>
        ))}
      </div>

      {/* Full List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/30">
          <h2 className="font-semibold text-sm">All Rankings</h2>
        </div>
        <div className="divide-y divide-border">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors"
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                entry.rank <= 3
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {entry.rank}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{entry.name}</h3>
                <p className="text-xs text-muted-foreground">Grade {entry.grade} • {entry.quizzes} quizzes</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">{entry.score.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
