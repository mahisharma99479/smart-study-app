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
  FileText,
  PenLine,
  Plus,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Note } from "../../backend.d.ts";
import {
  useAddNote,
  useDeleteNote,
  useNotesBySubject,
  useUpdateNote,
} from "../../hooks/useQueries";
import NoteFormDialog from "./NoteFormDialog";

interface NotesTabProps {
  subjectId: string;
}

function NoteCard({
  note,
  index,
  onEdit,
  onDelete,
}: {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onDelete: (id: bigint) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      data-ocid={`notes.item.${index}`}
      className="bg-card rounded-xl border border-border shadow-xs overflow-hidden group"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2">
                {note.title}
              </h3>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.p
                    key="expanded"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 text-sm text-muted-foreground font-body leading-relaxed whitespace-pre-wrap overflow-hidden"
                  >
                    {note.content}
                  </motion.p>
                ) : (
                  <motion.p
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-xs text-muted-foreground font-body line-clamp-2"
                  >
                    {note.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary font-body transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Kam Dikhao</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Zyada Dikhao</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              data-ocid={`notes.edit_button.${index}`}
              onClick={() => onEdit(note)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              aria-label="Edit note"
            >
              <PenLine className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-ocid={`notes.delete_button.${index}`}
              onClick={() => onDelete(note.id)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              aria-label="Delete note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NotesTab({ subjectId }: NotesTabProps) {
  const { data: notes, isLoading, isError } = useNotesBySubject(subjectId);
  const addNote = useAddNote(subjectId);
  const updateNote = useUpdateNote(subjectId);
  const deleteNote = useDeleteNote(subjectId);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);

  const handleAdd = async (title: string, content: string) => {
    await addNote.mutateAsync({ title, content });
    setAddDialogOpen(false);
  };

  const handleEdit = async (title: string, content: string) => {
    if (!editNote) return;
    await updateNote.mutateAsync({ id: editNote.id, title, content });
    setEditNote(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    await deleteNote.mutateAsync(deleteId);
    setDeleteId(null);
  };

  if (isLoading) {
    return (
      <div data-ocid="notes.loading_state" className="space-y-3 pt-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div data-ocid="notes.error_state" className="text-center py-10">
        <p className="text-destructive font-body text-sm">
          Notes load karne mein error aaya. Dobara try karein.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-2">
      {/* Add Button */}
      <Button
        data-ocid="notes.add_button"
        onClick={() => setAddDialogOpen(true)}
        className="w-full font-body gap-2"
        variant="outline"
      >
        <Plus className="w-4 h-4" />
        Nayi Note Add Karein
      </Button>

      {/* Notes List */}
      {notes && notes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="notes.empty_state"
          className="text-center py-14 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/8 flex items-center justify-center">
            <FileText className="w-7 h-7 text-primary/50" />
          </div>
          <h3 className="font-display font-semibold text-base text-foreground mb-1">
            Abhi koi note nahi hai
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Upar "Nayi Note Add Karein" button dabake apni pehli note likhein!
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {(notes ?? []).map((note, index) => (
              <NoteCard
                key={note.id.toString()}
                note={note}
                index={index + 1}
                onEdit={(n) => setEditNote(n)}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Add Dialog */}
      <NoteFormDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAdd}
        isPending={addNote.isPending}
      />

      {/* Edit Dialog */}
      <NoteFormDialog
        open={!!editNote}
        onOpenChange={(open) => {
          if (!open) setEditNote(null);
        }}
        onSubmit={handleEdit}
        editNote={editNote}
        isPending={updateNote.isPending}
      />

      {/* Delete Confirm */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="notes.dialog" className="font-body">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Note Delete Karein?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Kya aap sure hain? Yeh note permanently delete ho jaayegi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="notes.cancel_button"
              className="font-body"
            >
              Nahi
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="notes.confirm_button"
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
