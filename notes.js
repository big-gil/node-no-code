const fs = require("fs");
const chalk = require("chalk");

// Add Note
const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicates = notes.filter((note) => {
    if (note.title === title) {
      console.log(
        chalk.red.inverse.bold("Duplicate note titled: %s"),
        note.title
      );
      return true;
    } else {
      console.log(
        chalk.green.inverse.bold("Keeping note titled: %s"),
        note.title
      );
      return false;
    }
  });

  debugger;

  if (duplicates.length === 0) {
    console.log(chalk.green.inverse.bold("Adding note titled: %s"), title);
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
  }
};

const saveNotes = (notes) => {
  const strData = JSON.stringify(notes);

  const noteStr = fs.writeFileSync("note.json", strData);
};

const loadNotes = () => {
  const notes = [];

  try {
    const noteStr = fs.readFileSync("note.json");
    const noteObj = JSON.parse(noteStr);
    return noteObj;
  } catch (e) {
    console.log("Error occurred: %s", e);
    return notes;
  }
};

// Remove note
const removeNote = (title) => {
  const notes = loadNotes();

  const keptNotes = notes.filter((note) => {
    if (note.title === title) {
      console.log(
        chalk.red.inverse.bold("Removing note titled: %s"),
        note.title
      );
      return false;
    } else {
      console.log(
        chalk.green.inverse.bold("keeping note titled: %s"),
        note.title
      );
      return true;
    }
  });

  if (keptNotes > 0) {
    saveNotes(keptNotes);
  } else {
    console.log(chalk.red.inverse.bold("Note not found."));
  }
};

// List Notes
const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((element) => {
    console.log("Note: %s", element.title);
  });
};

// Read Note
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(
      chalk.green.inverse("Title: %s   Body: %s"),
      note.title,
      note.body
    );
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

// Exports
module.exports = { addNote, removeNote, listNotes, readNote };
