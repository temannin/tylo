import { create } from "zustand";
import { IBoard } from "../Board";
import { createCard, saveCard } from "./api";
import { ICard } from "../components/Card/Card";

import objectScan from "object-scan";
import { IBucket } from "../Bucket";
import { getCard } from "./boardUtils";

interface BoardState {
  board: IBoard;
  setBoard: (board: IBoard) => void;
  active: string;
  setActive: (by: string) => void;
  saveCard: (card: ICard) => void;
  createCard: (bucket_id: string) => Promise<ICard | undefined>;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    id: "",
    buckets: [],
    created_at: new Date(),
    updated_at: new Date(),
    name: null,
  },
  setBoard: (by) => {
    set(() => ({ board: by }));
  },
  active: "",
  setActive: (by) => set(() => ({ active: by })),
  saveCard: async (card) => {
    let response = await saveCard(card);
    if (response.ok) {
      let board = JSON.parse(JSON.stringify(get().board));
      let cardFromBoard = getCard(board, card.id, false) as ICard;
      Object.assign(cardFromBoard, card);
      set(() => ({ board: board }));
    }
  },
  createCard: async (bucket_id) => {
    let response = await createCard(bucket_id);
    if (!response.ok) return;

    let card: ICard = await response.json();
    let board = JSON.parse(JSON.stringify(get().board));

    const bucket = objectScan(["buckets[*]"], {
      rtn: "value",
      filterFn: ({ value }) => {
        return value.id === bucket_id;
      },
      abort: true,
    })(board) as IBucket | undefined;

    bucket?.cards.push(card);
    get().setBoard(board);

    return card;
  },
}));
