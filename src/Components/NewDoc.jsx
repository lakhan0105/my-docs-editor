import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NewDoc() {
  return (
    <section className="bg-[#eaeaea] m-auto text-black min-h-[calc(100vh-70px)] overflow-hidden">
      <div className="bg-white px-3 w-full">
        <label htmlFor="">Title</label>
        <input type="text" className="w-full outline-none border-b" />
      </div>

      <ReactQuill theme="snow" />
    </section>
  );
}

export default NewDoc;
