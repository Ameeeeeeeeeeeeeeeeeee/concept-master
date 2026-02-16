import Link from "next/link";
import { notFound } from "next/navigation";
import { getGrade } from "@/lib/curriculum-data";

interface Props {
  params: Promise<{ grade: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { grade } = await params;
  return {
    title: `Grade ${grade} - ConceptMaster`,
    description: `Explore Grade ${grade} subjects: English, Physics, Chemistry, and Biology with AI-powered learning.`,
  };
}

export default async function GradePage({ params }: Props) {
  const { grade: gradeStr } = await params;
  const gradeNum = parseInt(gradeStr);

  if (isNaN(gradeNum) || gradeNum < 9 || gradeNum > 12) {
    notFound();
  }

  const grade = getGrade(gradeNum);
  if (!grade) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/grades" className="hover:text-foreground transition-colors">Grades</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Grade {gradeNum}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Grade {gradeNum}
        </h1>
        <p className="text-muted-foreground">
          Choose a subject to start learning with AI-powered explanations and practice quizzes.
        </p>
      </div>

      {/* Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {grade!.subjects.map((subject) => (
          <Link
            key={subject.slug}
            href={`/grade/${gradeNum}/${subject.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card card-hover"
          >
            <div className={`h-2 bg-gradient-to-r ${subject.color}`}></div>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  {subject.icon}
                </div>
                <svg className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">{subject.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {subject.topics.length} topics • {subject.topics.reduce((a, t) => a + t.concepts.length, 0)} concepts
              </p>

              {/* Topic List */}
              <div className="space-y-2">
                {subject.topics.map((topic, i) => (
                  <div
                    key={topic.slug}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    {topic.title}
                    <span className="text-xs ml-auto">
                      {topic.concepts.length} concepts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
