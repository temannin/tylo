import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DroppableContainer,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card, ICard } from "./components/Card/Card";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state";
import { getCard, move } from "./utils/boardUtils";
import { Bucket, IBucket } from "./Bucket";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import { saveBoard, saveCard } from "./utils/api";

export interface IBoard {
  created_at: Date;
  updated_at: Date;
  name: null;
  id: string;
  buckets: IBucket[];
}

function customCollisionDetectionAlgorithm({
  droppableContainers,
  ...args
}: {
  droppableContainers: DroppableContainer[];
}) {
  //@ts-ignore
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
    useShallow((state) => [state.active, state.board, state.setActive])
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
    })
  );

  const { height } = useWindowDimensions();

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
        onDragStart={(event: DragStartEvent) => {
          setActive(event.active.id.toString());
        }}
        onDragOver={(event: DragOverEvent) => {
          const clonedBoard = JSON.parse(JSON.stringify(board));
          move(clonedBoard, event);
          useBoardStore.getState().setBoard(clonedBoard);
        }}
        onDragEnd={(e: DragEndEvent) => {
          setActive("");
          const [bucket, card] = getCard(
            useBoardStore.getState().board,
            e.active.id,
            false,
            ["gparent", "value"]
          );
          console.log("Firing");
          saveCard({ ...card, ...{ bucket_id: bucket.id } });
          saveBoard(useBoardStore.getState().board);
        }}
      >
        <div
          style={{
            userSelect: "none",
            display: "inline-flex",
            height: height,
            padding: 8,
          }}
        >
          {data.buckets?.map((item) => {
            return <Bucket key={item.id} data={item}></Bucket>;
          })}
        </div>
        <DragOverlay>
          <Card data={activeItem}></Card>
        </DragOverlay>
      </DndContext>
    </>
  );
}
