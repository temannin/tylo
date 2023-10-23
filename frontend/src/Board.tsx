import { Bucket, IBucket } from "./Bucket.tsx";
import {
  DndContext,
  DragOverlay,
  DroppableContainer,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card, ICard } from "./components/Card.tsx";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state.ts";
import { getCard, move } from "./utils/boardUtils.ts";

export interface IBoard {
  created_at: Date;
  updated_at: Date;
  name: null;
  ident: string;
  buckets: IBucket[];
}

function customCollisionDetectionAlgorithm({
  droppableContainers,
  ...args
}: {
  droppableContainers: DroppableContainer[];
}) {
  // @ts-ignore
  const pointerIntersections = pointerWithin({
    ...args,
    droppableContainers: droppableContainers,
  });

  // Compute other collisions
  return pointerIntersections;
}

//#endregion

export function Board({ data }: { data: IBoard }) {
  const [active, board, setActive] = useBoardStore(
    useShallow((state) => [state.active, state.board, state.setActive]),
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
  );

  const activeItem: ICard = getCard(board, active);

  return (
    <>
      <DndContext
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        collisionDetection={customCollisionDetectionAlgorithm}
        sensors={sensors}
        onDragStart={(event) => {
          setActive(event.active.id.toString());
        }}
        onDragOver={(event) => {
          let clonedBoard = JSON.parse(JSON.stringify(board));
          move(clonedBoard, event);
          useBoardStore.getState().setBoard(clonedBoard);
        }}
        onDragEnd={() => {
          setActive("");
        }}
      >
        <div
          style={{
            userSelect: "none",
            display: "inline-flex",
          }}
          className={"min-h-screen"}
        >
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
