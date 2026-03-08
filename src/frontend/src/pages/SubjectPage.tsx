import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { SUBJECTS } from "../App";
import NotesTab from "../components/study/NotesTab";
import QuestionsTab from "../components/study/QuestionsTab";

interface SubjectPageProps {
  subjectId: string;
  onBack: () => void;
}

export default function SubjectPage({ subjectId, onBack }: SubjectPageProps) {
  const subject = SUBJECTS.find((s) => s.id === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center font-body">
          <p className="text-muted-foreground">Subject not found.</p>
          <Button onClick={onBack} variant="ghost" className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 z-10 ${subject.colorClass} border-b-2 px-4 py-3 shadow-xs`}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 p-0 rounded-lg hover:bg-black/10 flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="subject-icon-bg w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-base leading-none">{subject.emoji}</span>
            </div>
            <div className="min-w-0">
              <h1
                className={`font-display text-base font-bold leading-tight ${subject.textColor} truncate`}
              >
                {subject.name}
              </h1>
              <p className="text-xs text-muted-foreground font-body">
                Class 12
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-5 h-10 rounded-xl bg-muted/70">
              <TabsTrigger
                value="notes"
                data-ocid="subject.notes.tab"
                className="rounded-lg font-body text-sm gap-1.5 data-[state=active]:bg-card data-[state=active]:shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                data-ocid="subject.questions.tab"
                className="rounded-lg font-body text-sm gap-1.5 data-[state=active]:bg-card data-[state=active]:shadow-xs"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Important Qs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-0 animate-fade-in">
              <NotesTab subjectId={subjectId} />
            </TabsContent>

            <TabsContent value="questions" className="mt-0 animate-fade-in">
              <QuestionsTab subjectId={subjectId} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with{" "}
          <span className="text-red-500">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
