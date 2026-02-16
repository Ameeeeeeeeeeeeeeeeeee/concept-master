import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject, getTopic } from "@/lib/curriculum-data";

interface Props {
  params: Promise<{ grade: string; subject: string; topic: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { grade, subject, topic: topicSlug } = await params;
  const gradeNum = parseInt(grade);
  const topicData = getTopic(gradeNum, subject, topicSlug);
  const subjectData = getSubject(gradeNum, subject);

  return {
    title: `${topicData?.title || topicSlug} - ${subjectData?.name} Grade ${grade} | ConceptMaster`,
    description: `Explore ${topicData?.title} concepts in ${subjectData?.name} for Grade ${grade}`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { grade: gradeStr, subject: subjectSlug, topic: topicSlug } = await params;
  const gradeNum = parseInt(gradeStr);

  if (isNaN(gradeNum) || gradeNum < 9 || gradeNum > 12) notFound();

  const subject = getSubject(gradeNum, subjectSlug);
  const topic = getTopic(gradeNum, subjectSlug, topicSlug);

  if (!subject || !topic) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/grade/${gradeNum}`} className="hover:text-foreground transition-colors">Grade {gradeNum}</Link>
        <span>/</span>
        <Link href={`/grade/${gradeNum}/${subjectSlug}`} className="hover:text-foreground transition-colors">{subject.name}</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{topic.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{subject.icon}</span>
          <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
            Grade {gradeNum}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{topic.title}</h1>
        <p className="text-muted-foreground">
          {topic.concepts.length} concepts to master in this topic.
        </p>
      </div>

      {/* Concepts List */}
      <div className="space-y-3">
        {topic.concepts.map((concept, i) => (
          <Link
            key={concept.slug}
            href={`/grade/${gradeNum}/${subjectSlug}/${topicSlug}/${concept.slug}`}
            className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-xl flex items-center justify-center text-sm font-bold shrink-0">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {concept.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Click to learn with AI explanations, quizzes, and exam tips
              </p>
            </div>
            <svg className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Quiz CTA */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-primary/20 p-6 text-center">
        <h3 className="text-lg font-bold mb-2">Ready to test yourself? 📝</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Take a quiz on {topic.title} to check your understanding.
        </p>
        <Link
          href={`/quiz?topic=${topic.title}&grade=${gradeNum}&subject=${subjectSlug}`}
          className="btn-primary inline-block"
        >
          Start Quiz →
        </Link>
      </div>
    </div>
  );
}
