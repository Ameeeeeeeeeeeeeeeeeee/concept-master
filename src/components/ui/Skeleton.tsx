export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-3 bg-muted rounded w-1/2"></div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded"></div>
        <div className="h-3 bg-muted rounded w-5/6"></div>
      </div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-muted rounded"
          style={{ width: `${100 - i * 15}%` }}
        ></div>
      ))}
    </div>
  );
}

export function ConceptSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-muted rounded-lg w-2/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-12 bg-muted rounded-xl"></div>
        <div className="h-12 bg-muted rounded-xl"></div>
        <div className="h-12 bg-muted rounded-xl"></div>
        <div className="h-12 bg-muted rounded-xl"></div>
      </div>
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 bg-muted rounded w-3/4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-muted rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}
