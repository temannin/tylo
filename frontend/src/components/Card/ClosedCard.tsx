import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useCard } from "./Card";
import { useBoardStore } from "../../utils/state";

export default function ClosedCard() {
  const { card, setIsOpen } = useCard();
  const showCardDetails = useBoardStore((state) => state.showCardDetails);

  const {
    isDragging,
    transform,
    setNodeRef,
    attributes,
    listeners,
    transition,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
  };

  const abbreviateDescription = (
    description?: string,
    maxLength: number = 155
  ) => {
    if (!description) return "";
    let text =
      description.length > maxLength ? (
        <>{description.slice(0, maxLength)}...</>
      ) : (
        description
      );

    return <p className="font-light text-xs">{text}</p>;
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full border-2 rounded shadow p-2 mb-2 cursor-pointer hover:bg-gray-200"
      onClick={() => setIsOpen(true)}
    >
      <p className="font-semibold">{card.title}</p>
      {showCardDetails ? (
        <p className="font-light text-sm">
          {abbreviateDescription(card.description)}
        </p>
      ) : null}
    </div>
  );
}
