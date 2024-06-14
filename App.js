import React, { useState } from "react";
import Home from "./src/screens/home";
import AddNote from "./src/screens/addNote";
import EditNote from "./src/screens/editNote";
import { SafeAreaView, StatusBar } from "react-native";

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  deleteNote,
  updateNote,
  currentNoteId,
  setCurrentNoteId,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
          setCurrentNoteId={setCurrentNoteId}
        />
      );
    case "add":
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case "edit":
      const noteToEdit = noteList.find((note) => note.id === currentNoteId);
      return (
        <EditNote
          setCurrentPage={setCurrentPage}
          updateNote={updateNote}
          note={noteToEdit}
        />
      );
    default:
      return <Home />;
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: "Note pertama",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
    },
  ]);

  // Menambahkan Note
  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc: desc,
      },
    ]);
  };

  // Menghapus Note
  const deleteNote = (id) => {
    setNoteList(noteList.filter((note) => note.id !== id));
  };

  // Memperbarui Note
  const updateNote = (id, title, desc) => {
    setNoteList(
      noteList.map((note) => (note.id === id ? { id, title, desc } : note))
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <CurrentPageWidget
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        noteList={noteList}
        addNote={addNote}
        deleteNote={deleteNote}
        updateNote={updateNote}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
      />
    </SafeAreaView>
  );
};

export default App;
