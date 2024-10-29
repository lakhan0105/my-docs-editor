import { Databases, Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function UserDocuments() {
  const { client, databaseId, collectionId, currUser } = useMyContext();
  const [userDocs, setUserDocs] = useState(null);
  const [emptyState, setEmptyState] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // function to list all the user docs
  const fetchUserDocs = async () => {
    const databases = new Databases(client);
    try {
      console.log("running fetchUsersDocs");
      const result = await databases.listDocuments(
        databaseId, // databaseId
        collectionId, // collectionId
        [Query.equal("userId", [currUser?.userId])] // queries
      );

      // add loading....
      setIsLoading(true);

      if (result) {
        // remove loading...
        setIsLoading(false);

        // if no docs is saved in the backend then, make emptyState to true
        if (result.documents.length === 0) {
          setEmptyState(true);
        }

        setUserDocs(result.documents);
      }

      return { documents: result?.documents };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (currUser) {
      fetchUserDocs();
    }
  }, [currUser]);

  if (emptyState) {
    return (
      <h2 className="text-3xl text-white/70 text-center mt-[10%]">
        No document is saved by the user :(
      </h2>
    );
  }

  return (
    <section>
      <div className="max-w-[1000px] m-auto pt-10">
        <h2 className="text-4xl font-bold mb-10">Documents by the user</h2>

        <div className="mt-5">
          {isLoading && <h2 className="text-4xl">Loading...</h2>}
          {userDocs?.map((item) => {
            const { docId, userId, editorContent, docTitle, $updatedAt } = item;

            return (
              <Link
                to={`/doc/${docId}`}
                key={docId}
                className="border-b border-white/10 flex items-center justify-between px-5 py-5 bg-[#1C1C21] hover:bg-[#1a1a1a]"
              >
                <div className="flex items-center justify-between gap-10 w-[60%]">
                  <div className="flex items-end gap-1 text-white/80">
                    <span className="text-3xl">
                      <IoDocumentTextOutline />
                    </span>
                    <p className="pt-2 capitalize">{docTitle}</p>
                  </div>

                  <div className="flex items-center gap-1 text-white/50">
                    <span className="text-2xl">
                      <IoTimeOutline />
                    </span>
                    <p className="text-sm">{$updatedAt}</p>
                  </div>
                </div>
                <div>
                  <button>del</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UserDocuments;
