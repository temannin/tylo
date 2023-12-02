import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ICard, IOpenState } from "./Card";

export default function ClosedCard({
  data,
  openState,
}: {
  data: ICard;
  openState: IOpenState;
}) {
  const {
    isDragging,
    transform,
    setNodeRef,
    attributes,
    listeners,
    transition,
  } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full border-2 rounded shadow p-2 mb-2 cursor-pointer hover:bg-gray-200"
      onClick={() => openState.setOpen(true)}
    >
      <p>{data.title}</p>
    </div>
  );
}
