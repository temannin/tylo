import { create } from "zustand";
import { IBoard } from "../Board.tsx";

interface BoardState {
  board: IBoard;
  setBoard: (board: IBoard) => void;
  active: string;
  setActive: (by: string) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: {
    ident: "",
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
}));
