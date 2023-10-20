import { Bucket, IBucket } from "./Bucket.tsx";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card, ICard } from "./components/Card.tsx";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state.ts";
import { getCard, isBelowOverItem, move } from "./utils/boardUtils.ts";
import { useState } from "react";

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

  const sensors = useSensors(useSensor(PointerSensor));

  const activeItem: ICard = getCard(board, active);

  return (
    <>
      <DndContext
        measuring={{
          dragOverlay: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragStart={(event) => {
          setActive(event.active.id.toString());
        }}
        onDragOver={(event) => {
          let clonedBoard = JSON.parse(JSON.stringify(board));
          move(clonedBoard, event);
          useBoardStore.getState().setBoard(clonedBoard);
        }}
        onDragEnd={(event) => {
          setActive("");
        }}
      >
        <div style={{ userSelect: "none", display: "inline-flex" }}>
          {data.buckets?.map((item) => {
            return <Bucket key={item.ident} data={item}></Bucket>;
          })}
        </div>
        <DragOverlay>
          <Card data={activeItem}></Card>
        </DragOverlay>
      </DndContext>
    </>
  );
}
