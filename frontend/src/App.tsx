import { useEffect, useState } from "react";
import { Board, IBoard } from "./Board.tsx";
import { useParams } from "react-router-dom";

import { useBoardStore } from "./utils/state.ts";
import { useShallow } from "zustand/react/shallow";

export default function App() {
  const { boardId } = useParams();

  const board = useBoardStore(useShallow((state) => state.board));
  const setBoard = useBoardStore(useShallow((state) => state.setBoard));

  useEffect(() => {
    async function loadBuckets() {
      const response = await fetch(`/api/boards/${boardId}`);
      if (!response.ok) return;

      let json: IBoard = await response.json();
      setBoard(json);
    }

    loadBuckets();
  }, []);

  useEffect(() => {
    async function saveBoard() {}

    saveBoard();
  }, []);

  return (
    <>
      <div className={"ml-2 flex"}>
        {board ? <Board data={board}></Board> : null}
      </div>
    </>
  );
}
