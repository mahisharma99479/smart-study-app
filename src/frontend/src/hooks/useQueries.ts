import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Note, Question } from "../backend.d.ts";
import { useActor } from "./useActor";

// ─── Notes ───────────────────────────────────────────────────────────────────

export function useNotesBySubject(subjectId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Note[]>({
    queryKey: ["notes", subjectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotesBySubject(subjectId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddNote(subjectId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
    }: {
      title: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addNote(subjectId, title, content, BigInt(Date.now()));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", subjectId] });
      toast.success("Note added successfully!");
    },
    onError: () => {
      toast.error("Failed to add note. Please try again.");
    },
  });
}

export function useUpdateNote(subjectId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      title,
      content,
    }: {
      id: bigint;
      title: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateNote(id, title, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", subjectId] });
      toast.success("Note updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update note. Please try again.");
    },
  });
}

export function useDeleteNote(subjectId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", subjectId] });
      toast.success("Note deleted.");
    },
    onError: () => {
      toast.error("Failed to delete note. Please try again.");
    },
  });
}

// ─── Questions ────────────────────────────────────────────────────────────────

export function useQuestionsBySubject(subjectId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["questions", subjectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestionsBySubject(subjectId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddQuestion(subjectId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      questionText,
      answer,
    }: {
      questionText: string;
      answer: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addQuestion(
        subjectId,
        questionText,
        answer,
        BigInt(Date.now()),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", subjectId] });
      toast.success("Question added successfully!");
    },
    onError: () => {
      toast.error("Failed to add question. Please try again.");
    },
  });
}

export function useUpdateQuestion(subjectId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      questionText,
      answer,
    }: {
      id: bigint;
      questionText: string;
      answer: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateQuestion(id, questionText, answer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", subjectId] });
      toast.success("Question updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update question. Please try again.");
    },
  });
}

export function useDeleteQuestion(subjectId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteQuestion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions", subjectId] });
      toast.success("Question deleted.");
    },
    onError: () => {
      toast.error("Failed to delete question. Please try again.");
    },
  });
}
