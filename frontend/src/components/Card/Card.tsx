import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OpenCard from "./OpenCard";
import ClosedCard from "./ClosedCard";
import { useIsFirstRender } from "../../utils/hooks/useIsFirstRender";
import { saveCard } from "../../utils/api";
import { useBoardStore } from "../../utils/state";

export interface ICard {
  id: string;
  title: string;
  bucket_id: string;
  created_at: Date;
  updated_at: Date;
  description: string;
}

export interface CardContextType {
  card: ICard;
  setCard: React.Dispatch<React.SetStateAction<ICard>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  save: () => void;
  cancel: () => void;
}

// Create a context for the Card
const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCard = (): CardContextType => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};

export function Card({ data }: { data: ICard }) {
  const params = useParams();
  const navigate = useNavigate();
  const firstRender = useIsFirstRender();

  const [card, setCard] = useState(data);
  const [isOpen, setIsOpen] = useState(false);

  const save = async () => {
    useBoardStore.getState().saveCard(card);
    setIsOpen(false);
  };

  const cancel = () => {
    setCard(data);
    setIsOpen(false);
  };

  const contextValue: CardContextType = {
    card,
    setCard,
    isOpen,
    setIsOpen,
    save,
    cancel,
  };

  useEffect(() => {
    setCard(data);
  }, [data]);

  useEffect(() => {
    setIsOpen(params?.cardId === data.id);
  }, [params]);

  useEffect(() => {
    if (firstRender) return;
    let url = `/boards/${params.boardId}`;

    if (isOpen) {
      url = `${url}/cards/${data.id}`;
    }

    navigate(url);
  }, [isOpen]);

  return (
    <CardContext.Provider value={contextValue}>
      {isOpen ? <OpenCard></OpenCard> : null}
      <ClosedCard></ClosedCard>
    </CardContext.Provider>
  );
}
