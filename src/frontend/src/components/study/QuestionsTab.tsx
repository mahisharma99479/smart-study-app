import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  PenLine,
  Plus,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Question } from "../../backend.d.ts";
import {
  useAddQuestion,
  useDeleteQuestion,
  useQuestionsBySubject,
  useUpdateQuestion,
} from "../../hooks/useQueries";
import QuestionFormDialog from "./QuestionFormDialog";

interface QuestionsTabProps {
  subjectId: string;
}

function QuestionCard({
  question,
  index,
  onEdit,
  onDelete,
}: {
  question: Question;
  index: number;
  onEdit: (q: Question) => void;
  onDelete: (id: bigint) => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      data-ocid={`questions.item.${index}`}
      className="bg-card rounded-xl border border-border shadow-xs overflow-hidden"
    >
      <div className="p-4">
        {/* Question */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-display font-bold text-amber-700">
            Q
          </div>
          <p className="text-sm font-body font-medium text-foreground leading-relaxed flex-1">
            {question.questionText}
          </p>
        </div>

        {/* Answer Toggle */}
        <div className="mt-3 ml-9">
          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-1.5 text-xs font-body font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {showAnswer ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Answer Chhupao
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Answer Dekho
              </>
            )}
          </button>

          <AnimatePresence initial={false}>
            {showAnswer && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 flex items-start gap-2.5">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-display font-bold text-emerald-700">
                    A
                  </div>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {question.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            data-ocid={`questions.edit_button.${index}`}
            onClick={() => onEdit(question)}
            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            aria-label="Edit question"
          >
            <PenLine className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            data-ocid={`questions.delete_button.${index}`}
            onClick={() => onDelete(question.id)}
            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            aria-label="Delete question"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function QuestionsTab({ subjectId }: QuestionsTabProps) {
  const {
    data: questions,
    isLoading,
    isError,
  } = useQuestionsBySubject(subjectId);
  const addQuestion = useAddQuestion(subjectId);
  const updateQuestion = useUpdateQuestion(subjectId);
  const deleteQuestion = useDeleteQuestion(subjectId);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  const handleAdd = async (questionText: string, answer: string) => {
    await addQuestion.mutateAsync({ questionText, answer });
    setAddDialogOpen(false);
  };

  const handleEdit = async (questionText: string, answer: string) => {
    if (!editQuestion) return;
    await updateQuestion.mutateAsync({
      id: editQuestion.id,
      questionText,
      answer,
    });
    setEditQuestion(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    await deleteQuestion.mutateAsync(deleteId);
    setDeleteId(null);
  };

  if (isLoading) {
    return (
      <div data-ocid="questions.loading_state" className="space-y-3 pt-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div data-ocid="questions.error_state" className="text-center py-10">
        <p className="text-destructive font-body text-sm">
          Questions load karne mein error aaya. Dobara try karein.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Add Button */}
      <Button
        data-ocid="questions.add_button"
        onClick={() => setAddDialogOpen(true)}
        className="w-full font-body gap-2"
        variant="outline"
      >
        <Plus className="w-4 h-4" />
        Naya Question Add Karein
      </Button>

      {/* Questions List */}
      {questions && questions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="questions.empty_state"
          className="text-center py-14 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-amber-400" />
          </div>
          <h3 className="font-display font-semibold text-base text-foreground mb-1">
            Abhi koi question nahi hai
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Important questions add karein jo exam mein aate hain!
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {(questions ?? []).map((question, index) => (
              <QuestionCard
                key={question.id.toString()}
                question={question}
                index={index + 1}
                onEdit={(q) => setEditQuestion(q)}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Add Dialog */}
      <QuestionFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAdd}
        isPending={addQuestion.isPending}
      />

      {/* Edit Dialog */}
      <QuestionFormDialog
        open={!!editQuestion}
        onOpenChange={(open) => {
          if (!open) setEditQuestion(null);
        }}
        onSubmit={handleEdit}
        editQuestion={editQuestion}
        isPending={updateQuestion.isPending}
      />

      {/* Delete Confirm */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="questions.dialog" className="font-body">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Question Delete Karein?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Kya aap sure hain? Yeh question permanently delete ho jaayega.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="questions.cancel_button"
              className="font-body"
            >
              Nahi
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="questions.confirm_button"
              onClick={handleDeleteConfirm}
              className="font-body bg-destructive hover:bg-destructive/90"
            >
              Haan, Delete Karein
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
