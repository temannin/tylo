import { useState, ChangeEvent, useEffect } from "react";
import { useIsFirstRender } from "../../utils/hooks/useIsFirstRender";

interface ClickableTextProps {
  value: string;
  onChange: (event: string) => void;
  submitOnEnter?: boolean;
}

export default function ClickableText({
  value,
  onChange,
  submitOnEnter = false,
}: ClickableTextProps): JSX.Element {
  const [internalValue, setInternalValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (isFirstRender) return;
    if (!isEditing) onChange(internalValue);
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
  };

  return (
    <div onClick={handleClick}>
      {isEditing ? (
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (!submitOnEnter) return;
            if (event.key === "Enter") {
              handleBlur();
            }
          }}
          autoFocus
        />
      ) : (
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {internalValue}
        </h3>
      )}
    </div>
  );
}
