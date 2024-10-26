import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getFromLS } from "../utils/localStorage";
import { useMyContext } from "../Context/ContextProvider";
import { Databases } from "appwrite";
import { v4 as uuidv4 } from "uuid";

function Doc() {
  // grab the id from the URL
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [editorContentState, setEditorContentState] = useState("");

  const { saveNewDoc, client, databaseId, collectionId } = useMyContext();
  const navigate = useNavigate();

  const [docData, setDocData] = useState({
    docId: id || uuidv4(),
    docTitle: String(title),
    editorContent: editorContentState || "",
    userId: getFromLS("currUser").userId,
  });

  const fetchDoc = async () => {
    const databases = new Databases(client);

    try {
      const result = await databases.getDocument(
        databaseId, // databaseId
        collectionId, // collectionId
        id // documentId
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // fetch the data if its present when this page loads
  useEffect(() => {
    const loadDoc = async () => {
      if (id) {
        try {
          const { docId, docTitle, editorContent, userId } = await fetchDoc();
          setTitle(docTitle);
          setEditorContentState(editorContent);
          setDocData((prev) => {
            return {
              ...prev,
              docId,
              userId,
              editorContent: editorContentState,
            };
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    loadDoc();
  }, [id]);

  // when there is changes in editor, this function will run
  function handleEditorChanges(content) {
    setEditorContentState(content);
  }

  // function to handle save
  function handleSave() {
    const updatedDocData = {
      ...docData,
      docTitle: title,
      editorContent: editorContentState,
    };

    // pass the updated values to the saveNewDoc to save the new document in the appwrite database
    saveNewDoc(updatedDocData, navigate);
  }

  return (
    <section className="bg-[#eaeaea] m-auto text-black min-h-[calc(100vh-70px)] overflow-hidden">
      <div className="bg-white px-3 w-full">
        <label htmlFor="doc-title">Title</label>
        <input
          type="text"
          className="w-full outline-none border-b"
          // defaultValue={title}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button onClick={handleSave}>save</button>
      </div>

      <ReactQuill
        onChange={handleEditorChanges}
        value={editorContentState}
        theme="snow"
      />
    </section>
  );
}

export default Doc;
