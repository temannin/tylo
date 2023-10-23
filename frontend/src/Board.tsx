import { Bucket, IBucket } from "./Bucket.tsx";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
  rectIntersection,
  closestCorners,
} from "@dnd-kit/core";
import { Card, ICard } from "./components/Card.tsx";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state.ts";
import { getCard, move } from "./utils/boardUtils.ts";
import { Simulate } from "react-dom/test-utils";
import pointerOver = Simulate.pointerOver;

export interface IBoard {
  created_at: Date;
  updated_at: Date;
  name: null;
  ident: string;
  buckets: IBucket[];
}

function customCollisionDetectionAlgorithm({ droppableContainers, ...args }) {
  // @ts-ignore
  // let collisions = closestCorners({
  //   ...args,
  //   droppableContainers: droppableContainers.filter(({ data }) => {
  //     return data.current.type === "container";
  //   }),
  // });
  //
  // if (collisions.length > 0) {
  //   return collisions;
  // }

  let containers = droppableContainers.filter(({ id }) => true);
  const pointerIntersections = pointerWithin({
    ...args,
    droppableContainers: containers,
  });

  console.log(pointerIntersections);

  // Compute other collisions
  return pointerIntersections;
}

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
        distance: 6,
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
        onDragEnd={(event) => {
          setActive("");
          let clonedBoard = JSON.parse(JSON.stringify(board));
          move(clonedBoard, event);
          useBoardStore.getState().setBoard(clonedBoard);
        }}
      >
        <div
          style={{ userSelect: "none", display: "inline-flex" }}
          className={"flex h-screen"}
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
