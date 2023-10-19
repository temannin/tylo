import { Bucket, IBucket } from "./Bucket.tsx";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { findByIdent, move } from "./utils/boardUtils.ts";
import { Card } from "./components/Card.tsx";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state.ts";

export interface IBoard {
  created_at: Date;
  updated_at: Date;
  name: null;
  ident: string;
  buckets: IBucket[];
}

export function Board({ data }: { data: IBoard }) {
  const [active, board, setActive] = useBoardStore(
    useShallow((state) => [state.active, state.board, state.setActive]),
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleDragOver(event: DragEndEvent) {
    let boardClone = JSON.parse(JSON.stringify(board));
    if (event.active.id === event.over?.id) return;
    move(boardClone, event, false);
  }

  function handleDragEnd(event: DragEndEvent) {
    let boardClone = JSON.parse(JSON.stringify(board));
    if (event.active.id === event.over?.id) return;
    move(boardClone, event, true);
  }

  const overlayData = (() => {
    let result = findByIdent(board, active);
    return result;
  })();

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={(event) => {
          setActive(event.active.id.toString());
        }}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {data.buckets?.map((item) => {
          return <Bucket key={item.ident} data={item}></Bucket>;
        })}
        <DragOverlay>
          <Card data={overlayData}></Card>
        </DragOverlay>
      </DndContext>
    </>
  );
}
