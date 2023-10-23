import { useEffect, useState } from "react";
import { Card, ICard } from "./components/Card.tsx";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
        className={"w-[300px] h-screen border-2 my-4 rounded ml-2 bg-gray-200"}
      >
        <div className={"ml-4 mt-2 font-bold"}>
          <h1>{data.ident}</h1>
        </div>
        <div className={"bg-white m-1 rounded p-1"}>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={cardsById}
          >
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
  const { listeners, setNodeRef } = useSortable({
    id,
    disabled: true,
    data: {
      type: "container",
    },
  });

  return (
    <>
      <div {...listeners} ref={setNodeRef} className={"h-[93svh]"}>
        {children}
      </div>
    </>
  );
}
