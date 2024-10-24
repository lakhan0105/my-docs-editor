import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getFromLS } from "../utils/localStorage";
import { useMyContext } from "../Context/ContextProvider";

function NewDoc() {
  // grab the id from the URL
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const { saveNewDoc } = useMyContext();
  const navigate = useNavigate();

  // const docData = { docId: id, docTitle: title };
  const [docData, setDocData] = useState({
    docId: id,
    docTitle: title.toString(),
    editorContent: "",
    userId: getFromLS("currUser").userId,
  });

  // when there is changes in editor, this function will run
  function handleEditorChanges(content) {
    setDocData((prev) => {
      return { ...prev, editorContent: content };
    });
  }

  return (
    <section className="bg-[#eaeaea] m-auto text-black min-h-[calc(100vh-70px)] overflow-hidden">
      <div className="bg-white px-3 w-full">
        <label htmlFor="doc-title">Title</label>
        <input
          type="text"
          className="w-full outline-none border-b"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button
          onClick={() => {
            saveNewDoc(docData, navigate);
          }}
        >
          save
        </button>
      </div>

      <ReactQuill onChange={handleEditorChanges} theme="snow" />
    </section>
  );
}

export default NewDoc;
