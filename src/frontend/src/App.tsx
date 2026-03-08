import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import SubjectPage from "./pages/SubjectPage";

export type Subject = {
  id: string;
  name: string;
  emoji: string;
  colorClass: string;
  textColor: string;
};

export const SUBJECTS: Subject[] = [
  {
    id: "hindi",
    name: "Hindi",
    emoji: "📖",
    colorClass: "subject-hindi",
    textColor: "text-[oklch(0.35_0.18_25)]",
  },
  {
    id: "english",
    name: "English",
    emoji: "🔤",
    colorClass: "subject-english",
    textColor: "text-[oklch(0.3_0.18_265)]",
  },
  {
    id: "physics",
    name: "Physics",
    emoji: "⚛️",
    colorClass: "subject-physics",
    textColor: "text-[oklch(0.3_0.16_200)]",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    emoji: "🧪",
    colorClass: "subject-chemistry",
    textColor: "text-[oklch(0.28_0.18_140)]",
  },
  {
    id: "biology_maths",
    name: "Biology / Maths",
    emoji: "🧬",
    colorClass: "subject-biology_maths",
    textColor: "text-[oklch(0.3_0.18_320)]",
  },
  {
    id: "history",
    name: "History",
    emoji: "🏛️",
    colorClass: "subject-history",
    textColor: "text-[oklch(0.32_0.16_60)]",
  },
];

type View = { page: "home" } | { page: "subject"; subjectId: string };

export default function App() {
  const [view, setView] = useState<View>({ page: "home" });

  const navigateToSubject = (subjectId: string) => {
    setView({ page: "subject", subjectId });
  };

  const navigateToHome = () => {
    setView({ page: "home" });
  };

  return (
    <>
      {view.page === "home" ? (
        <HomePage onSubjectSelect={navigateToSubject} />
      ) : (
        <SubjectPage subjectId={view.subjectId} onBack={navigateToHome} />
      )}
      <Toaster richColors position="top-center" />
    </>
  );
}
