# Smart Study App

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Smart Study App for Class 12 students
- App logo (uploaded by user)
- Subjects section with: Hindi, English, Physics, Chemistry, Biology/Maths, History
- For each subject: Notes section and Important Questions section
- Ability to add, view, edit, and delete notes per subject
- Ability to add, view, edit, and delete important questions per subject
- Notes and questions stored persistently in backend

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- Data types: Subject (id, name), Note (id, subjectId, title, content, createdAt), Question (id, subjectId, questionText, answer, createdAt)
- CRUD operations for Notes: addNote, getNotesBySubject, updateNote, deleteNote
- CRUD operations for Questions: addQuestion, getQuestionsBySubject, updateQuestion, deleteQuestion
- Pre-seeded subjects: Hindi, English, Physics, Chemistry, Biology/Maths, History

### Frontend (React)
- Home screen with app logo and subject cards grid
- Subject detail page with two tabs: "Notes" and "Important Questions"
- Notes tab: list of notes, add note form (title + content), edit/delete
- Questions tab: list of questions, add question form (question + answer), edit/delete
- Responsive layout suitable for students
- Use uploaded logo at /assets/uploads/file_0000000079a471fab3a0c607c387b423-1.png
