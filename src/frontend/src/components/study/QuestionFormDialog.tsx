import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Question } from "../../backend.d.ts";

interface QuestionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (questionText: string, answer: string) => Promise<void>;
  editQuestion?: Question | null;
  isPending?: boolean;
}

export default function QuestionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  editQuestion,
  isPending = false,
}: QuestionFormDialogProps) {
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: open intentionally resets form when dialog reopens
  useEffect(() => {
    if (editQuestion) {
      setQuestionText(editQuestion.questionText);
      setAnswer(editQuestion.answer);
    } else {
      setQuestionText("");
      setAnswer("");
    }
  }, [editQuestion, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !answer.trim()) return;
    await onSubmit(questionText.trim(), answer.trim());
    if (!editQuestion) {
      setQuestionText("");
      setAnswer("");
    }
  };

  const isEditing = !!editQuestion;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md font-body"
        data-ocid="questions.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            {isEditing ? "Question Edit Karein" : "Naya Question Add Karein"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="question-text" className="text-sm font-medium">
              Question
            </Label>
            <Input
              id="question-text"
              data-ocid="questions.input"
              placeholder="Question likhein..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="font-body"
              required
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="question-answer" className="text-sm font-medium">
              Answer
            </Label>
            <Textarea
              id="question-answer"
              data-ocid="questions.textarea"
              placeholder="Answer likhein..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="font-body min-h-[120px] resize-none"
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="questions.cancel_button"
              onClick={() => onOpenChange(false)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="questions.submit_button"
              disabled={isPending || !questionText.trim() || !answer.trim()}
              className="font-body"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Karein" : "Save Karein"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
