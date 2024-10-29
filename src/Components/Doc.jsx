import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getFromLS } from "../utils/localStorage";
import { useMyContext } from "../Context/ContextProvider";
import { Databases, Permission, Role } from "appwrite";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineLockClock } from "react-icons/md";

function Doc() {
  // grab the id from the URL
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [editorContentState, setEditorContentState] = useState("");
  const [permissionCards, setPermissionCards] = useState(false);

  const { client, databaseId, collectionId } = useMyContext();
  const navigate = useNavigate();

  const [docData, setDocData] = useState({
    docId: id || uuidv4(),
    docTitle: String(title),
    permissionName: "private",
    editorContent: editorContentState || "",
    userId: getFromLS("currUser").userId,
  });

  // an array of permissions that changes when the user changes the access of the document
  const [permissionData, setPermissionData] = useState([
    Permission.write(Role.user(docData.userId)),
    Permission.read(Role.user(docData.userId)),
    Permission.update(Role.user(docData.userId)),
    Permission.delete(Role.user(docData.userId)),
  ]);

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
      console.log("error code is:", error.code);
    }
  };

  // fetch the data if its present when this page loads
  useEffect(() => {
    console.log(docData);
    const loadDoc = async () => {
      if (id) {
        try {
          const { docId, docTitle, editorContent, userId, permissionName } =
            await fetchDoc();
          setTitle(docTitle);
          setEditorContentState(editorContent);
          setDocData((prev) => {
            return {
              ...prev,
              docId,
              userId,
              permissionName,
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

  // function to create new document
  const saveNewDoc = async (docData) => {
    const databases = new Databases(client);
    console.log(docData);

    try {
      const result = await databases.createDocument(
        databaseId, // databaseId
        collectionId, // collectionId
        docData?.docId, // documentId
        docData, // data

        // when the doc is created only the user has all permissions
        permissionData
      );

      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to update and save the document (which is already been saved in the backend)
  const updateAndSave = async (updatedDocData) => {
    const databases = new Databases(client);

    try {
      const result = await databases.updateDocument(
        databaseId, // databaseId
        collectionId, // collectionId
        updatedDocData?.docId, // documentId
        updatedDocData, // data (optional)

        // when the doc is created only the user has all permissions
        permissionData
      );
      if (result) {
        navigate("/");
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to handle save
  function handleSave() {
    const updatedDocData = {
      ...docData,
      docTitle: title,
      editorContent: editorContentState,
    };

    if (id) {
      updateAndSave(updatedDocData, navigate);
    } else {
      // pass the updated values to the saveNewDoc to save the new document in the appwrite database
      saveNewDoc(updatedDocData);
    }
  }

  // handlePermission
  function handlePermissionName(e) {
    // setPermissionName(e.target.name);
    setDocData((prev) => {
      return { ...prev, permissionName: e.target.name };
    });

    setPermissionCards(false);
  }

  useEffect(() => {
    if (docData.permissionName === "private") {
      setPermissionData([
        Permission.write(Role.user(docData.userId)),
        Permission.read(Role.user(docData.userId)),
        Permission.update(Role.user(docData.userId)),
        Permission.delete(Role.user(docData.userId)),
      ]);
    } else if (docData.permissionName === "public") {
      setPermissionData([
        Permission.write(Role.any()),
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ]);
    }
  }, [docData?.permissionName]);

  return (
    <section className="bg-[#eaeaea] m-auto text-black min-h-[calc(100vh-70px)] overflow-hidden">
      <div className="bg-white px-3 w-full flex gap-5">
        <div className="w-[80%]">
          <label htmlFor="doc-title">Title</label>
          <input
            type="text"
            className="w-full outline-none border-b"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        {/* buttons */}
        <div className="flex gap-4 items-end">
          <button
            onClick={handleSave}
            className="bg-[#42d806] text-sm text-white px-5 py-1 rounded"
          >
            save
          </button>

          <div className="relative z-10">
            {/* share button (helps to choose to whom we can share the doc) */}
            <button
              className="w-[100px] rounded border border-black/10 text-sm py-1 flex items-center justify-center gap-1"
              onClick={() => {
                setPermissionCards((prev) => !prev);
              }}
            >
              <span className="text-black text-xl">
                <MdOutlineLockClock />
              </span>
              {docData?.permissionName}
            </button>

            {/* permission cards (it contains buttons) */}
            {permissionCards && (
              <article className="absolute top-8 right-0 w-[250px] translate-x-[30%] p-2 flex flex-col bg-white/90 rounded shadow-sm leading-loose shadow-xl">
                <button name="private" onClick={handlePermissionName}>
                  Private
                </button>
                <button name="public" onClick={handlePermissionName}>
                  Public
                </button>
                <button name="with-user" onClick={handlePermissionName}>
                  Share with user
                </button>
              </article>
            )}
          </div>
        </div>
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
