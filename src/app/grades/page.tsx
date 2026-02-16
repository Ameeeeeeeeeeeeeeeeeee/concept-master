import Link from "next/link";
import { curriculumData } from "@/lib/curriculum-data";

export const metadata = {
  title: "All Grades - ConceptMaster",
  description: "Browse all grades and subjects available on ConceptMaster",
};

export default function GradesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          📚 All Grades
        </h1>
        <p className="text-muted-foreground">
          Choose your grade to start learning. Each grade covers English, Physics, Chemistry, and Biology.
        </p>
      </div>

      {/* Grades */}
      <div className="space-y-8">
        {curriculumData.map((grade) => (
          <div key={grade.number} className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Grade Header */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Grade {grade.number}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {grade.subjects.length} subjects • {grade.subjects.reduce((acc, s) => acc + s.topics.length, 0)} topics
                  </p>
                </div>
                <Link
                  href={`/grade/${grade.number}`}
                  className="btn-primary text-sm !py-2"
                >
                  Explore →
                </Link>
              </div>
            </div>

            {/* Subjects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {grade.subjects.map((subject) => (
                <Link
                  key={subject.slug}
                  href={`/grade/${grade.number}/${subject.slug}`}
                  className="group rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <h3 className="font-semibold">{subject.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {subject.topics.length} topics • {subject.topics.reduce((acc, t) => acc + t.concepts.length, 0)} concepts
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {subject.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic.slug}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
                      >
                        {topic.title}
                      </span>
                    ))}
                    {subject.topics.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{subject.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
