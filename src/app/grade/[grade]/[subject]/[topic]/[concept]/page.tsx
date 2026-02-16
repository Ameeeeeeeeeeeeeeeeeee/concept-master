import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject, getTopic, getConcept, curriculumData } from "@/lib/curriculum-data";
import AIExplainer from "@/components/ai/AIExplainer";
import QuizGenerator from "@/components/quiz/QuizGenerator";

interface Props {
  params: Promise<{ grade: string; subject: string; topic: string; concept: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const grade of curriculumData) {
    for (const subject of grade.subjects) {
      for (const topic of subject.topics) {
        for (const concept of topic.concepts) {
          params.push({
            grade: grade.number.toString(),
            subject: subject.slug,
            topic: topic.slug,
            concept: concept.slug,
          });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { grade, subject, topic, concept: conceptSlug } = await params;
  const gradeNum = parseInt(grade);
  const conceptData = getConcept(gradeNum, subject, topic, conceptSlug);
  const subjectData = getSubject(gradeNum, subject);

  return {
    title: `${conceptData?.title || conceptSlug} - ${subjectData?.name} Grade ${grade} | ConceptMaster`,
    description: `Learn about ${conceptData?.title} in ${subjectData?.name} for Grade ${grade}. AI-powered explanations, practice questions, and exam tips.`,
  };
}

export default async function ConceptPage({ params }: Props) {
  const { grade: gradeStr, subject: subjectSlug, topic: topicSlug, concept: conceptSlug } = await params;
  const gradeNum = parseInt(gradeStr);

  if (isNaN(gradeNum) || gradeNum < 9 || gradeNum > 12) notFound();

  const subject = getSubject(gradeNum, subjectSlug);
  const topic = getTopic(gradeNum, subjectSlug, topicSlug);
  const concept = getConcept(gradeNum, subjectSlug, topicSlug, conceptSlug);

  if (!subject || !topic || !concept) notFound();

  // Find adjacent concepts for navigation
  const conceptIndex = topic.concepts.findIndex((c) => c.slug === conceptSlug);
  const prevConcept = conceptIndex > 0 ? topic.concepts[conceptIndex - 1] : null;
  const nextConcept = conceptIndex < topic.concepts.length - 1 ? topic.concepts[conceptIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/grade/${gradeNum}`} className="hover:text-foreground transition-colors">
          Grade {gradeNum}
        </Link>
        <span>/</span>
        <Link href={`/grade/${gradeNum}/${subjectSlug}`} className="hover:text-foreground transition-colors">
          {subject.name}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{concept.title}</span>
      </nav>

      {/* Concept Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{subject.icon}</span>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            {topic.title}
          </span>
          <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
            Grade {gradeNum}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{concept.title}</h1>
        <p className="text-muted-foreground">
          Click any button below to get an AI-powered explanation, practice questions, or exam tips.
        </p>
      </div>

      {/* AI Explainer */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          🤖 AI Learning Assistant
        </h2>
        <AIExplainer
          concept={concept.title}
          grade={gradeNum}
          subject={subject.name}
        />
      </section>

      {/* Quiz Generator */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          📝 Practice Quiz
        </h2>
        <div className="rounded-2xl border border-border bg-card p-6">
          <QuizGenerator
            topic={concept.title}
            grade={gradeNum}
            subject={subject.name}
          />
        </div>
      </section>

      {/* Related Concepts */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">📚 Other Concepts in This Topic</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topic.concepts
            .filter((c) => c.slug !== conceptSlug)
            .map((c, i) => (
              <Link
                key={c.slug}
                href={`/grade/${gradeNum}/${subjectSlug}/${topicSlug}/${c.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all"
              >
                <span className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{c.title}</span>
              </Link>
            ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        {prevConcept ? (
          <Link
            href={`/grade/${gradeNum}/${subjectSlug}/${topicSlug}/${prevConcept.slug}`}
            className="btn-secondary text-sm"
          >
            ← {prevConcept.title}
          </Link>
        ) : (
          <div></div>
        )}
        {nextConcept ? (
          <Link
            href={`/grade/${gradeNum}/${subjectSlug}/${topicSlug}/${nextConcept.slug}`}
            className="btn-primary text-sm"
          >
            {nextConcept.title} →
          </Link>
        ) : (
          <Link href={`/grade/${gradeNum}/${subjectSlug}`} className="btn-primary text-sm">
            Back to {subject.name} →
          </Link>
        )}
      </div>
    </div>
  );
}
