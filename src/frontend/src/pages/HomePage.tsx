import { BookOpen, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { SUBJECTS } from "../App";

interface HomePageProps {
  onSubjectSelect: (subjectId: string) => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage({ onSubjectSelect }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/60 px-4 py-3"
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/uploads/file_0000000079a471fab3a0c607c387b423-1.png"
              alt="Smart Study Logo"
              className="w-9 h-9 rounded-xl object-contain shadow-xs"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div>
              <h1 className="font-display text-lg font-bold leading-tight text-foreground">
                Smart Study
              </h1>
              <p className="text-xs text-muted-foreground font-body leading-none">
                Class 12
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs font-body text-muted-foreground bg-muted/60 rounded-full px-3 py-1.5">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>6 Subjects</span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-3xl mx-auto px-4 pt-8 pb-4 w-full"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.45_0.22_265)] to-[oklch(0.38_0.2_285)] px-6 py-7 shadow-lg">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/8" />
          <div className="absolute top-4 right-16 w-8 h-8 rounded-full bg-white/15" />

          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <img
                src="/assets/uploads/file_0000000079a471fab3a0c607c387b423-1.png"
                alt=""
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).replaceWith(
                    Object.assign(document.createElement("span"), {
                      textContent: "📚",
                      className: "text-2xl",
                    }),
                  );
                }}
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white leading-tight">
                Padhai ka
                <br />
                <span className="text-yellow-300">Smart Saathi!</span>
              </h2>
              <p className="mt-1.5 text-white/80 text-sm font-body leading-relaxed">
                Class 12 ke saare subjects ki notes aur important questions ek
                jagah.
              </p>
            </div>
          </div>

          <div className="relative mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-white text-xs font-body">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notes & Questions</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-white text-xs font-body">
              ✏️ <span>Edit Anytime</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subjects Grid */}
      <main className="flex-1 max-w-3xl mx-auto px-4 pb-8 w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-body font-medium text-muted-foreground mb-4 mt-2"
        >
          Apna subject chunein 👇
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3.5"
        >
          {SUBJECTS.map((subject, index) => (
            <motion.button
              key={subject.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              data-ocid={`home.subject.card.${index + 1}`}
              onClick={() => onSubjectSelect(subject.id)}
              className={`${subject.colorClass} relative overflow-hidden rounded-2xl border-2 p-4 text-left shadow-card hover:shadow-card-hover transition-shadow duration-200 cursor-pointer group`}
            >
              {/* Decorative corner circle */}
              <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white/20 group-hover:scale-110 transition-transform duration-200" />

              <div className="relative">
                <div className="subject-icon-bg w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-sm">
                  <span className="text-xl leading-none">{subject.emoji}</span>
                </div>
                <h3
                  className={`font-display font-bold text-sm leading-tight ${subject.textColor}`}
                >
                  {subject.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground font-body">
                  Notes & Questions
                </p>
              </div>
            </motion.button>
          ))}
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
