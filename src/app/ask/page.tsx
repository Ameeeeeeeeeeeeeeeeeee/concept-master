import AskAnything from "@/components/ai/AskAnything";

export const metadata = {
  title: "Ask AI - ConceptMaster",
  description: "Ask any question about your high school subjects and get instant AI-powered answers.",
};

export default function AskPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🤖</div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Ask Anything</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Type any question about English, Physics, Chemistry, or Biology and get a clear, simple explanation from our AI.
        </p>
      </div>

      {/* Ask Component */}
      <AskAnything />
    </div>
  );
}
