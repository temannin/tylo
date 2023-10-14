import { useEffect, useState } from "react";
import { Card, ICard } from "./components/Card.tsx";
import { getBucket } from "./utils/api.ts";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragOverlay } from "@dnd-kit/core";

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
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    async function loadCards() {
      let response = await getBucket(data.ident);
      let json: IBucket = await response.json();
      setCards(json.cards);
    }

    loadCards();
  }, [data.ident]);

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
              <Card
                data={{
                  ident: "placeholder",
                  id: 1,
                  bucket_id: 1,
                  title: "placeholder",
                  description: "",
                  created_at: new Date(),
                  updated_at: new Date(),
                }}
              ></Card>
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </>
  );
}
