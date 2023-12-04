import { useEffect } from "react";
import { Board, IBoard } from "./Board";
import { useParams } from "react-router-dom";

import { useBoardStore } from "./utils/state";
import { useShallow } from "zustand/react/shallow";
import AddButton from "./AddButton";
import NavBar from "./NavBar";

export default function App() {
  const { boardId } = useParams();

  const board = useBoardStore(useShallow((state) => state.board));
  const setBoard = useBoardStore(useShallow((state) => state.setBoard));

  useEffect(() => {
    async function loadBuckets() {
      const response = await fetch(`/api/boards/${boardId}`);
      if (!response.ok) return;

      const json: IBoard = await response.json();
      setBoard(json);
    }

    loadBuckets();
  }, []);

  return (
    <>
      <div className={"max-h-full overflow-y-hidden"}>
        <NavBar />
        {board ? <Board data={board}></Board> : null}
        <AddButton />
      </div>
    </>
  );
}
