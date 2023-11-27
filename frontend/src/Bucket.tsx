import { useEffect, useState, useRef } from "react";
import { Card, ICard } from "./components/Card";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";

export interface IBucket {
  id: string;
  name: string;
  order: null;
  created_at: Date;
  updated_at: Date;
  board_id: number;
  cards: ICard[];
}

export function Bucket({ data }: { data: IBucket }) {
  const [cards, setCards] = useState<ICard[]>(data.cards);

  useEffect(() => {
    setCards(data.cards);
  }, [data.cards]);

  const cardsById = cards.map((item) => {
    return item.id;
  });

  return (
    <>
      <div className={"w-[300px] h-full border-2 rounded ml-2 bg-gray-200"}>
        <div className={"ml-4 mt-2 font-bold"}>
          <h1>{data.name}</h1>
        </div>
        <div className={"bg-white m-1 rounded p-1"}>
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={cardsById}
          >
            <DroppableContainer id={data.id}>
              {cards.map((item) => {
                return <Card key={item.id} data={item} />;
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

  const [heightOfElement, setHeightOfElement] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (ref.current) {
      setHeightOfElement(
        height - ref.current?.getBoundingClientRect().top - 20
      );
    }
  }, [height, ref]);

  return (
    <>
      <div {...listeners} ref={setNodeRef} className="">
        <div style={{ height: heightOfElement, overflowY: "auto" }} ref={ref}>
          {children}
        </div>
      </div>
    </>
  );
}
