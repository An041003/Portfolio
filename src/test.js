import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
  };

  const getHtmlContent = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        placeholder="Start writing..."
      />
      <textarea
        disabled
        value={getHtmlContent()}
        style={{ width: "100%", height: "200px", marginTop: "20px" }}
      />
    </div>
  );
};

export default RichTextEditor;
