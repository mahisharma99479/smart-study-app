import Nat "mo:core/Nat";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

actor {
  // Data Types
  type Note = {
    id : Nat;
    subjectId : Text;
    title : Text;
    content : Text;
    createdAt : Int;
  };

  type Question = {
    id : Nat;
    subjectId : Text;
    questionText : Text;
    answer : Text;
    createdAt : Int;
  };

  // Data Structures
  let notes = List.empty<Note>();
  let questions = List.empty<Question>();

  // ID Counters
  var noteIdCounter = 0;
  var questionIdCounter = 0;

  // Note Comparison Function
  module Note {
    public func compareById(a : Note, b : Note) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Question Comparison Function
  module Question {
    public func compareById(a : Question, b : Question) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // Notes Functions
  public shared ({ caller }) func addNote(subjectId : Text, title : Text, content : Text, createdAt : Int) : async Nat {
    let newId = noteIdCounter;
    let note : Note = {
      id = newId;
      subjectId;
      title;
      content;
      createdAt;
    };
    notes.add(note);
    noteIdCounter += 1;
    newId;
  };

  public query ({ caller }) func getNotesBySubject(subjectId : Text) : async [Note] {
    let filteredNotes = notes.filter(
      func(note) {
        Text.equal(note.subjectId, subjectId);
      }
    );
    filteredNotes.toArray().sort(Note.compareById);
  };

  public shared ({ caller }) func updateNote(id : Nat, title : Text, content : Text) : async () {
    let updatedNotes = notes.map<Note, Note>(
      func(note) {
        if (note.id == id) {
          { note with title; content };
        } else {
          note;
        };
      }
    );
    notes.clear();
    notes.addAll(updatedNotes.values());
  };

  public shared ({ caller }) func deleteNote(id : Nat) : async () {
    let filteredNotes = notes.filter(
      func(note) {
        note.id != id;
      }
    );
    notes.clear();
    notes.addAll(filteredNotes.values());
  };

  // Question Functions
  public shared ({ caller }) func addQuestion(subjectId : Text, questionText : Text, answer : Text, createdAt : Int) : async Nat {
    let newId = questionIdCounter;
    let question : Question = {
      id = newId;
      subjectId;
      questionText;
      answer;
      createdAt;
    };
    questions.add(question);
    questionIdCounter += 1;
    newId;
  };

  public query ({ caller }) func getQuestionsBySubject(subjectId : Text) : async [Question] {
    let filteredQuestions = questions.filter(
      func(question) {
        Text.equal(question.subjectId, subjectId);
      }
    );
    filteredQuestions.toArray().sort(Question.compareById);
  };

  public shared ({ caller }) func updateQuestion(id : Nat, questionText : Text, answer : Text) : async () {
    let updatedQuestions = questions.map<Question, Question>(
      func(question) {
        if (question.id == id) {
          { question with questionText; answer };
        } else {
          question;
        };
      }
    );
    questions.clear();
    questions.addAll(updatedQuestions.values());
  };

  public shared ({ caller }) func deleteQuestion(id : Nat) : async () {
    let filteredQuestions = questions.filter(
      func(question) {
        question.id != id;
      }
    );
    questions.clear();
    questions.addAll(filteredQuestions.values());
  };

  // Helper function to find if a subject is valid (fixed list)
  public query ({ caller }) func isValidSubject(subjectId : Text) : async Bool {
    let validSubjects = ["Hindi", "English", "Physics", "Chemistry", "Biology", "Maths", "History"];
    validSubjects.any(
      func(subject) {
        Text.equal(subject, subjectId);
      }
    );
  };
};
