import {
  BoldButton,
  Editor,
  EditorComposer,
  ItalicButton,
  ToolbarPlugin,
  UnderlineButton,
} from "verbum";

import "./TextEditorTheme.css";

export function TextEditor() {
  return (
    <>
      <EditorComposer>
        <div className={"border-2 rounded w-full"}>
          <Editor hashtagsEnabled={true}>
            <ToolbarPlugin defaultFontSize="12px">
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
            </ToolbarPlugin>
            <div className={"w-full mt-1.5 h-[2px] bg-gray-200"}></div>
          </Editor>
        </div>
      </EditorComposer>
    </>
  );
}
