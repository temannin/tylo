import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OpenCard from "./OpenCard";
import ClosedCard from "./ClosedCard";

export interface ICard {
  id: string;
  title: string;
  bucket_id: string;
  created_at: Date;
  updated_at: Date;
  description: string;
}

export interface IOpenState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export enum OpenCardDisplayState {
  DESCRIPTION,
  HISTORY,
}

export function Card({ data }: { data: ICard }) {
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpenFinal] = useState(false);
  const [state, setState] = useState(data);

  const setOpen = (value: boolean) => {
    setOpenFinal(value);

    let url = `/boards/${params.boardId}`;

    if (value) {
      url = `${url}/cards/${data.id}`;
    }

    navigate(url);
  };

  useEffect(() => {
    setOpenFinal(params?.cardId === data.id);
  }, [params]);

  useEffect(() => {
    setState(data);
  }, [data]);

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
