import { create } from "zustand";
import { IBoard } from "../Board.tsx";

interface BoardState {
  board: IBoard;
  setBoard: (board: IBoard) => void;
  active: string;
  setActive: (by: string) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: {},
  setBoard: (by) => set((state) => ({ board: by })),
  active: "",
  setActive: (by) => set((state) => ({ active: by })),
}));
