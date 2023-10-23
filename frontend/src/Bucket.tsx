import { useEffect, useState } from "react";
import { Card, ICard } from "./components/Card.tsx";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

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

export function Bucket({ data }: { data: IBucket }) {
  const [cards, setCards] = useState<ICard[]>(data.cards);

  useEffect(() => {
    setCards(data.cards);
  }, [data.cards]);

  const cardsById = cards.map((item) => {
    return item.ident;
  });

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
          <SortableContext items={cardsById}>
            <DroppableContainer id={data.ident}>
              {cards.map((item) => {
                return <Card key={item.ident} data={item} />;
              })}
            </DroppableContainer>
          </SortableContext>
        </div>
      </div>
    </>
  );
}

function DroppableContainer({ children, id }: { children: any; id: string }) {
  const { isOver, attributes, listeners, setNodeRef } = useSortable({
    id,
    data: {
      type: "container",
    },
  });

  if (isOver) {
    console.log("Over container");
  }
  return (
    <>
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={{ height: "100%" }}
      >
        {id}
        {children}
      </div>
    </>
  );
}
