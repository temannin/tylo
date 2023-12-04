import { create } from "zustand";
import { IBoard } from "../Board";
import { createBucket, createCard, saveCard, updateBucket } from "./api";
import { ICard } from "../components/Card/Card";

import objectScan from "object-scan";
import { IBucket } from "../Bucket";
import { getCard } from "./boardUtils";

interface BoardState {
  showCardDetails: boolean;
  setShowCardDetails: (by: boolean) => void;
  expand: boolean;
  setExpand: (by: boolean) => void;
  board: IBoard;
  setBoard: (board: IBoard) => void;
  saveItemInBoard: (
    itemType: ObjectType,
    identifier: string,
    value: IBoard | IBucket | ICard
  ) => void;
  active: string;
  setActive: (by: string) => void;
  saveCard: (card: ICard) => void;
  createCard: (bucket_id: string) => Promise<ICard | undefined>;
  createBucket: () => Promise<void>;
}

export enum ObjectType {
  CARD = "cards",
  BUCKET = "buckets",
  BOARD = "board",
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  showCardDetails: false,
  setShowCardDetails: (by: boolean) => {
    set(() => ({ showCardDetails: by }));
  },
  expand: false,
  setExpand: (by: boolean) => {
    set(() => ({ expand: by }));
  },
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
  saveItemInBoard: async (
    itemType: ObjectType,
    identifier: string,
    value: IBoard | IBucket | ICard
  ) => {
    let board: IBoard = JSON.parse(JSON.stringify(get().board));

    switch (itemType) {
      case ObjectType.BOARD:
        throw new Error("Board saving not supported");
        break;
      case ObjectType.BUCKET:
        for (let index = 0; index < board.buckets.length; index++) {
          if (board.buckets[index].id === identifier) {
            board.buckets[index] = value as IBucket;
            let response = await updateBucket(value as IBucket);
            if (response.ok) {
              get().setBoard(board);
            }
            // TODO: Handle bad response
            return;
          }
        }
        throw new Error("Bucket not found");
      default:
        break;
    }
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
  createBucket: async () => {
    let board: IBoard = JSON.parse(JSON.stringify(get().board));
    let bucket: unknown = {
      name: "Untitled",
      order: board.buckets.length,
      board_id: board.id,
      cards: [],
    };

    let response = await createBucket(bucket as IBucket);
    if (response.ok) {
      let json = await response.json();
      let retBucket: IBucket = json;
      retBucket.cards = [];
      board.buckets.push(retBucket);
      get().setBoard(board);
      return;
    }

    //TODO: Handle bad response
    throw new Error("Bucket was unable to be created");
  },
}));
