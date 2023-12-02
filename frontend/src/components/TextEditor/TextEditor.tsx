import { TextareaHTMLAttributes } from "react";

function TextEditor({
  onChange,
  value,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
  return (
    <textarea
      placeholder="Enter description"
      style={{
        width: "100%", // You can adjust the width as needed
        height: "400px", // You can adjust the height as needed
        fontSize: "14px", // You can adjust the font size as needed
        padding: "8px", // You can adjust the padding as needed
        outline: "none",
      }}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export default TextEditor;
