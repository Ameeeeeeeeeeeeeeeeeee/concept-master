import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getGradeLabel(grade: number): string {
  return `Grade ${grade}`;
}

export function getSubjectIcon(subject: string): string {
  const icons: Record<string, string> = {
    english: "📖",
    physics: "⚡",
    chemistry: "🧪",
    biology: "🧬",
  };
  return icons[subject.toLowerCase()] || "📚";
}

export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    english: "from-blue-500 to-indigo-600",
    physics: "from-amber-500 to-orange-600",
    chemistry: "from-green-500 to-emerald-600",
    biology: "from-purple-500 to-pink-600",
  };
  return colors[subject.toLowerCase()] || "from-gray-500 to-gray-600";
}

export function detectSubject(query: string): string | null {
  const q = query.toLowerCase();
  const subjectKeywords: Record<string, string[]> = {
    physics: [
      "newton",
      "force",
      "motion",
      "energy",
      "gravity",
      "velocity",
      "acceleration",
      "momentum",
      "wave",
      "light",
      "electric",
      "magnetic",
      "circuit",
      "thermodynamics",
      "pressure",
      "mass",
      "weight",
    ],
    chemistry: [
      "atom",
      "molecule",
      "element",
      "compound",
      "reaction",
      "acid",
      "base",
      "periodic",
      "bond",
      "ion",
      "solution",
      "mole",
      "oxidation",
      "reduction",
      "organic",
      "inorganic",
    ],
    biology: [
      "cell",
      "dna",
      "rna",
      "gene",
      "protein",
      "enzyme",
      "photosynthesis",
      "respiration",
      "evolution",
      "ecosystem",
      "organ",
      "tissue",
      "mitosis",
      "meiosis",
      "bacteria",
      "virus",
    ],
    english: [
      "grammar",
      "tense",
      "verb",
      "noun",
      "adjective",
      "essay",
      "literature",
      "poem",
      "story",
      "writing",
      "reading",
      "comprehension",
      "vocabulary",
      "sentence",
      "paragraph",
    ],
  };

  for (const [subject, keywords] of Object.entries(subjectKeywords)) {
    if (keywords.some((keyword) => q.includes(keyword))) {
      return subject;
    }
  }
  return null;
}
