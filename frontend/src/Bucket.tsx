import { useEffect, useState } from "react";
import { Card, ICard } from "./components/Card.tsx";
import { getBucket } from "./utils/api.ts";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useBoardStore } from "./utils/state.ts";
import { useShallow } from "zustand/react/shallow";

export interface IBucket {
  id: number;
  name: string;
  order: null;
  created_at: Date;
  updated_at: Date;
  board_id: number;
  ident: string;
  cards: ICard[];
}

function findId(obj, targetId) {
  // Base case: If the current object is null or undefined, return null
  if (obj === null || typeof obj === "undefined") {
    return null;
  }

  // Check if the current object has an 'id' property and if it matches the targetId
  if (obj.ident === targetId) {
    return obj;
  }

  // If the current object is an array, search each element in the array
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = findId(obj[i], targetId);
      if (result !== null) {
        return result; // Found the target ID in the array
      }
    }
  }

  // If the current object is an object, search its properties
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const result = findId(obj[key], targetId);
        if (result !== null) {
          return result; // Found the target ID in the object
        }
      }
    }
  }

  return null; // Target ID not found in the current object
}

export function Bucket({ data }: { data: IBucket }) {
  const [cards, setCards] = useState<ICard[]>(data.cards);
  const active = useBoardStore(useShallow((state) => state.active));

  const overlayData = (() => {
    let boardState = useBoardStore.getState().board;
    return findId(boardState, active);
  })();

  return (
    <>
      <div
        style={{ height: "calc(100vh - 2rem)" }}
        className={"w-[300px] border-2 my-4 rounded ml-2 bg-gray-200"}
      >
        <div className={"ml-4 mt-2 font-bold"}>
          <h1>{data.name}</h1>
        </div>
        <div className={"bg-white m-1 rounded p-1 h-[94%]"}>
          <DndContext
            onDragStart={(event) => {
              useBoardStore.getState().setActive(event.active.id.toString());
            }}
            onDragEnd={(event) => {
              console.log(event);
            }}
          >
            <SortableContext
              items={cards.map((item) => {
                return { id: item.ident };
              })}
            >
              {cards.map((item) => {
                return <Card key={item.ident} data={item} />;
              })}
            </SortableContext>
            <DragOverlay>
              <Card data={overlayData}></Card>
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </>
  );
}
