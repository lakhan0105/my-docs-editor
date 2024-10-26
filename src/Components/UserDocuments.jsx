import { Databases, Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function UserDocuments() {
  const { client, databaseId, collectionId, currUser } = useMyContext();
  const [userDocs, setUserDocs] = useState(null);

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

      if (result) setUserDocs(result.documents);
      return { documents: result?.documents };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchUserDocs();
    userDocs;
  }, [currUser]);

  return (
    <section>
      <div className="max-w-[1000px] m-auto pt-10">
        <h2 className="text-3xl font-bold mb-8">Documents by the user</h2>

        <div className="mt-5">
          {userDocs?.map((item) => {
            const { docId, userId, editorContent, docTitle, $updatedAt } = item;

            return (
              <Link
                to={`/doc/${docId}`}
                key={docId}
                className="ring-1 ring-white/10 rounded-xl flex items-center justify-between px-5 py-5 bg-[#2a2a2a] hover:bg-[#3a3a3a] mb-4"
              >
                <div className="flex items-center justify-between gap-10 w-[50%]">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl">
                      <IoDocumentTextOutline />
                    </span>
                    <p className="pt-2 font-bold text-lg">{docTitle}</p>
                  </div>

                  <div className="flex items-center gap-1">
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
