import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, ICard } from "./components/Card/Card";
import Button from "./components/global/Button";
import ClickableText from "./components/global/ClickableText";
import useWindowDimensions from "./utils/hooks/useWindowDimensions";
import { ObjectType, useBoardStore } from "./utils/state";
import { useIsFirstRender } from "./utils/hooks/useIsFirstRender";

export interface IBucket {
  id: string;
  name: string;
  order: number;
  created_at: Date;
  updated_at: Date;
  board_id: string;
  cards: ICard[];
}

export function Bucket({ data }: { data: IBucket }) {
  const params = useParams();
  const navigate = useNavigate();
  const isFirstRender = useIsFirstRender();
  const saveItemInBoard = useBoardStore((state) => state.saveItemInBoard);
  const dimensions = useWindowDimensions();

  const [content, setContent] = useState(data);
  const [createBucketButtonIsLoading, setCreateBucketButtonIsLoading] =
    useState(false);

  useEffect(() => {
    setContent(data);
  }, [data]);

  useEffect(() => {
    if (isFirstRender) return;
    saveItemInBoard(ObjectType.BUCKET, content.id, content);
  }, [content.name]);

  const cardsById = content.cards.map((item) => {
    return item.id;
  });

  const createCard = async () => {
    setCreateBucketButtonIsLoading(true);
    let card = await useBoardStore.getState().createCard(content.id);
    if (!card) return;
    let url = `/boards/${params.boardId}/cards/${card.id}`;
    navigate(url);
    setCreateBucketButtonIsLoading(false);
  };

  const expand = useBoardStore((state) => state.expand);

  return (
    <>
      <div
        style={{
          flexShrink: 0,
          width: expand
            ? `${
                dimensions.width /
                  useBoardStore.getState().board.buckets.length -
                9
              }px`
            : 300,
        }}
        className={"h-full border-2 rounded mr-2 bg-gray-200"}
      >
        <div className="ml-2 mt-2 grid grid-cols-12 gap-0">
          <div className={"mt-2 font-bold col-span-9"}>
            <ClickableText
              value={content.name}
              submitOnEnter
              onChange={(e) =>
                setContent((prevState) => {
                  return { ...prevState, ...{ name: e } };
                })
              }
            ></ClickableText>
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
            <DroppableContainer id={content.id}>
              {content.cards.map((item) => {
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
