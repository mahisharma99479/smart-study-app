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
import { Loader2, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import type { Note } from "../../backend.d.ts";

interface NoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, content: string) => Promise<void>;
  editNote?: Note | null;
  isPending?: boolean;
}

export default function NoteFormDialog({
  open,
  onOpenChange,
  onSubmit,
  editNote,
  isPending = false,
}: NoteFormDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: open intentionally resets form when dialog reopens
  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editNote, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    await onSubmit(title.trim(), content.trim());
    if (!editNote) {
      setTitle("");
      setContent("");
    }
  };

  const isEditing = !!editNote;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md font-body" data-ocid="notes.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <PenLine className="w-4 h-4 text-primary" />
            {isEditing ? "Note Edit Karein" : "Nayi Note Add Karein"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="note-title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="note-title"
              data-ocid="notes.input"
              placeholder="Note ka title likhein..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-body"
              required
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note-content" className="text-sm font-medium">
              Content
            </Label>
            <Textarea
              id="note-content"
              data-ocid="notes.textarea"
              placeholder="Note ka content likhein..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="font-body min-h-[120px] resize-none"
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="notes.cancel_button"
              onClick={() => onOpenChange(false)}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="notes.submit_button"
              disabled={isPending || !title.trim() || !content.trim()}
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
