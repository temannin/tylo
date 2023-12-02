import { useState, ChangeEvent } from "react";

interface ClickableTextProps {
  value: string;
  onChange: (event: string) => void;
}

export default function ClickableText({
  value,
  onChange,
}: ClickableTextProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div onClick={handleClick}>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {value}
        </h3>
      )}
    </div>
  );
}
