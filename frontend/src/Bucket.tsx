import { useEffect, useState, useRef } from "react";
import { Card, ICard } from "./components/Card/Card";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import Button from "./components/global/Button";
import { useBoardStore } from "./utils/state";
import { useNavigate, useParams } from "react-router-dom";

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
  const params = useParams();
  const navigate = useNavigate();

  const [createBucketButtonIsLoading, setCreateBucketButtonIsLoading] =
    useState(false);

  useEffect(() => {
    setCards(data.cards);
  }, [data.cards]);

  const cardsById = cards.map((item) => {
    return item.id;
  });

  const createCard = async () => {
    setCreateBucketButtonIsLoading(true);
    let card = await useBoardStore.getState().createCard(data.id);
    if (!card) return;

    let url = `/boards/${params.boardId}/cards/${card.id}`;
    navigate(url);
    setCreateBucketButtonIsLoading(false);
  };

  return (
    <>
      <div className={"w-[300px] h-full border-2 rounded ml-2 bg-gray-200"}>
        <div className="ml-2 mt-2 grid grid-cols-12 gap-0">
          <div className={"mt-2 font-bold col-span-9"}>
            <h1>{data.name}</h1>
          </div>
          <div className={"font-bold col-span-3"}>
            <Button
              isLoading={createBucketButtonIsLoading}
              onClick={() => {
                createCard();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
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
