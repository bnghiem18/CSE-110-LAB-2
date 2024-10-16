import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});

describe('Sticky Notes', () => {
  test('displays created notes', () => {
    render(<StickyNotes />);

    const noteTitle = 'test title';
    const noteContent = 'test content';

    // Create a note
    fireEvent.change(screen.getByPlaceholderText(/Note Title/i), { target: { value: noteTitle } });
    fireEvent.change(screen.getByPlaceholderText(/Note Content/i), { target: { value: noteContent } });
    fireEvent.click(screen.getByText(/Create Note/i));

    // Check if the note is displayed
    expect(screen.getByText(noteTitle)).toBeInTheDocument();
    expect(screen.getByText(noteContent)).toBeInTheDocument();
  });

  test('updates a note correctly', () => {
    render(<StickyNotes />);

    const noteTitle = 'test title';
    const noteContent = 'test content';

    // Create a note
    fireEvent.change(screen.getByPlaceholderText(/Note Title/i), { target: { value: noteTitle } });
    fireEvent.change(screen.getByPlaceholderText(/Note Content/i), { target: { value: noteContent } });
    fireEvent.click(screen.getByText(/Create Note/i));

    // Update the note
    const noteElement = screen.getByText(noteTitle);
    fireEvent.focus(noteElement);
    fireEvent.change(noteElement, { target: { innerHTML: 'updated test title' } });
    fireEvent.blur(noteElement); // Trigger update

    // Check if the note title is updated
    expect(screen.getByText('updated test title')).toBeInTheDocument();
  });

  test('delete notes', () => {
    render(<StickyNotes />);

    const noteTitle = 'test title';
    const noteContent = 'test content';

    // Create a note
    fireEvent.change(screen.getByPlaceholderText(/Note Title/i), { target: { value: noteTitle } });
    fireEvent.change(screen.getByPlaceholderText(/Note Content/i), { target: { value: noteContent } });
    fireEvent.click(screen.getByText(/Create Note/i));

    // Delete the note
    fireEvent.click(screen.getByTestId(`delete-button-${noteTitle}`));

    // Check if the note is removed
    expect(screen.queryByText(noteTitle)).not.toBeInTheDocument();
    expect(screen.queryByText(noteContent)).not.toBeInTheDocument();
  });
});

