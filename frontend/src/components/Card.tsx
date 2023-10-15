import { useState } from "react";
import { TextEditor } from "./TextEditor/TextEditor.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface ICard {
  id: number;
  title: string;
  bucket_id: number;
  created_at: Date;
  updated_at: Date;
  ident: string;
  description: string;
}

interface IOpenState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function Card({ data }: { data: ICard }) {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpenFinal] = useState(params?.cardId === data.ident);

  const setOpen = (value: boolean) => {
    setOpenFinal(value);

    let url = `/boards/${params.boardId}`;

    if (value) {
      url = `${url}/cards/${data.ident}`;
    }

    navigate(url);
  };

  return (
    <>
      {open ? (
        <>
          <OpenCard
            data={data}
            openState={{
              open,
              setOpen,
            }}
          ></OpenCard>
          <ClosedCard data={data} openState={{ open, setOpen }}></ClosedCard>
        </>
      ) : (
        <ClosedCard data={data} openState={{ open, setOpen }}></ClosedCard>
      )}
    </>
  );
}

function ClosedCard({
  data,
  openState,
}: {
  data: ICard;
  openState: IOpenState;
}) {
  const { transform, setNodeRef, attributes, listeners, transition } =
    useSortable({ id: data.ident });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full border-2 rounded shadow p-2 mb-2 cursor-pointer hover:bg-gray-200"
      // onClick={() => openState.setOpen(true)}
    >
      {data.title}
    </div>
  );
}

function OpenCard({ data, openState }: { data: ICard; openState: IOpenState }) {
  const close = () => {
    openState.setOpen(false);
  };

  return (
    <>
      <div
        onClick={close}
        id="defaultModal"
        tabIndex={-1}
        className="z-[1] bg-black opacity-50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full"
      ></div>
      <div className="z-[2] m-auto max-w-6xl max-h-full absolute left-0 right-0">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {data.title}
            </h3>
            <button
              onClick={close}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="px-2 pb-2">
            <TextEditor />
          </div>
        </div>
      </div>
    </>
  );
}
