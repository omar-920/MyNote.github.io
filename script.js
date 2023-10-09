// Get elements from the HTML document
const noteInput = document.getElementById("note-input");
const addButton = document.getElementById("add-button");
const notesList = document.getElementById("notes-list");

// Initialize notes array from localStorage or create an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to save notes to localStorage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to add a new note
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
        notes.push(noteText);
        saveNotes();
        displayNotes();
        noteInput.value = "";
    }
}

// Function to delete a note by index
function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

// Function to edit a note by index
function editNote(index) {
    const editedText = prompt("Edit your note:", notes[index]);
    if (editedText !== null) {
        notes[index] = editedText;
        saveNotes();
        displayNotes();
    }
}

// Function to display notes
function displayNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.innerHTML = `
            <p>${note}</p>
        <div class="notes-btn">
            <a class="btn btn-danger px-5" onclick="deleteNote(${index})">Delete</a>
            <a class="btn btn-primary px-5" onclick="editNote(${index})">Edit</a>
        </div>
        `;
        notesList.appendChild(noteElement);
    });
}

// Event listener for the "Add Note" button
addButton.addEventListener("click", addNote);

// Initial display of notes
displayNotes();
