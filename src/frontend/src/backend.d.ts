import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Note {
    id: bigint;
    title: string;
    content: string;
    createdAt: bigint;
    subjectId: string;
}
export interface Question {
    id: bigint;
    createdAt: bigint;
    answer: string;
    questionText: string;
    subjectId: string;
}
export interface backendInterface {
    addNote(subjectId: string, title: string, content: string, createdAt: bigint): Promise<bigint>;
    addQuestion(subjectId: string, questionText: string, answer: string, createdAt: bigint): Promise<bigint>;
    deleteNote(id: bigint): Promise<void>;
    deleteQuestion(id: bigint): Promise<void>;
    getNotesBySubject(subjectId: string): Promise<Array<Note>>;
    getQuestionsBySubject(subjectId: string): Promise<Array<Question>>;
    isValidSubject(subjectId: string): Promise<boolean>;
    updateNote(id: bigint, title: string, content: string): Promise<void>;
    updateQuestion(id: bigint, questionText: string, answer: string): Promise<void>;
}
