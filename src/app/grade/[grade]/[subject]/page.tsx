import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject } from "@/lib/curriculum-data";

interface Props {
  params: Promise<{ grade: string; subject: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { grade, subject } = await params;
  const subjectData = getSubject(parseInt(grade), subject);
  return {
    title: `${subjectData?.name || subject} - Grade ${grade} - ConceptMaster`,
    description: `Learn ${subjectData?.name || subject} for Grade ${grade} with AI-powered explanations`,
  };
}

export default async function SubjectPage({ params }: Props) {
  const { grade: gradeStr, subject: subjectSlug } = await params;
  const gradeNum = parseInt(gradeStr);

  if (isNaN(gradeNum) || gradeNum < 9 || gradeNum > 12) notFound();

  const subject = getSubject(gradeNum, subjectSlug);
  if (!subject) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/grades" className="hover:text-foreground transition-colors">Grades</Link>
        <span>/</span>
        <Link href={`/grade/${gradeNum}`} className="hover:text-foreground transition-colors">Grade {gradeNum}</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{subject.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{subject.icon}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">{subject.name}</h1>
            <p className="text-muted-foreground">Grade {gradeNum}</p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-6">
        {subject.topics.map((topic, topicIndex) => (
          <div
            key={topic.slug}
            className="rounded-2xl border border-border bg-card overflow-hidden animate-fade-in"
            style={{ animationDelay: `${topicIndex * 100}ms` }}
          >
            <div className="p-5 sm:p-6 border-b border-border bg-secondary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm font-bold">
                    {topicIndex + 1}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold">{topic.title}</h2>
                    <p className="text-xs text-muted-foreground">{topic.concepts.length} concepts</p>
                  </div>
                </div>
                <Link
                  href={`/quiz?topic=${topic.title}&grade=${gradeNum}&subject=${subjectSlug}`}
                  className="btn-ghost text-xs"
                >
                  📝 Quiz
                </Link>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topic.concepts.map((concept, i) => (
                  <Link
                    key={concept.slug}
                    href={`/grade/${gradeNum}/${subjectSlug}/${topic.slug}/${concept.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all"
                  >
                    <span className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {concept.title}
                    </span>
                    <svg className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
