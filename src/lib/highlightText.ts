export type HighlightKind = "number" | "keyword" | "impact";

export type HighlightPart = {
  text: string;
  kind?: HighlightKind;
};

const focusTerms = [
  "retrieval-augmented generation",
  "Computer Science Engineering",
  "conversational AI",
  "Computer Vision",
  "Machine Learning",
  "Data Analysis",
  "Generative AI",
  "Deep Learning",
  "semantic search",
  "goal tracking",
  "mood analytics",
  "rapid prototyping",
  "product decisions",
  "product vision",
  "user value",
  "practical AI systems",
  "real-time",
  "AssemblyAI",
  "LangChain",
  "MediaPipe",
  "Streamlit",
  "OpenCV",
  "Gemini",
  "FAISS",
  "Pycaw",
  "Python",
  "React",
  "SQL",
  "RAG",
  "NLP",
  "AI",
  "ML",
  "UX",
];

const impactTerms = [
  "built",
  "designed",
  "implemented",
  "delivered",
  "collaborating",
  "active member",
  "open to internships",
  "insights",
  "decisions",
];

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const focusPattern = new RegExp(
  `\\b(${focusTerms.map(escapeRegex).join("|")})\\b`,
  "gi"
);

const impactPattern = new RegExp(
  `\\b(${impactTerms.map(escapeRegex).join("|")})\\b`,
  "gi"
);

const numberPattern =
  /\b(?:\d+(?:\.\d+)?%?|\d{4}|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present)\b/g;

export function highlightTextParts(text = ""): HighlightPart[] {
  const matches: Array<{ start: number; end: number; kind: HighlightKind }> = [];

  const collect = (pattern: RegExp, kind: HighlightKind) => {
    for (const match of text.matchAll(pattern)) {
      if (match.index === undefined) continue;
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        kind,
      });
    }
  };

  collect(numberPattern, "number");
  collect(focusPattern, "keyword");
  collect(impactPattern, "impact");

  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  const parts: HighlightPart[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start < cursor) continue;
    if (match.start > cursor) {
      parts.push({ text: text.slice(cursor, match.start) });
    }
    parts.push({ text: text.slice(match.start, match.end), kind: match.kind });
    cursor = match.end;
  }

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor) });
  }

  return parts;
}
