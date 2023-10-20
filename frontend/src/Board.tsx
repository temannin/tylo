import { Bucket, IBucket } from "./Bucket.tsx";
import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Card } from "./components/Card.tsx";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "./utils/state.ts";
import { move } from "./utils/boardUtils.ts";

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
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
  );

  return (
    <>
      <DndContext
        measuring={{
          dragOverlay: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        sensors={sensors}
        onDragStart={(event) => {
          setActive(event.active.id.toString());
        }}
        onDragOver={(event) => {
          let clonedBoard = JSON.parse(JSON.stringify(board));
          move(clonedBoard, event);
          useBoardStore.getState().setBoard(clonedBoard);
        }}
      >
        {data.buckets?.map((item) => {
          return <Bucket key={item.ident} data={item}></Bucket>;
        })}
        <DragOverlay>
          <Card
            data={{
              id: 1,
              title: "",
              description: "",
              created_at: new Date(),
              updated_at: new Date(),
              ident: "dfsdf",
              bucket_id: 1,
            }}
          ></Card>
        </DragOverlay>
      </DndContext>
    </>
  );
}
