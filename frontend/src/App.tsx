import { useEffect, useState } from "react";
import { Board, IBoard } from "./Board.tsx";
import { useParams } from "react-router-dom";

export default function App() {
  const { boardId } = useParams();
  const [board, setBoard] = useState<IBoard>();

  useEffect(() => {
    async function loadBuckets() {
      const response = await fetch(`/api/boards/${boardId}`);
      if (!response.ok) return;

      let json: IBoard = await response.json();
      setBoard(json);
    }

    loadBuckets();
  }, []);

  return (
    <>
      <div className={"ml-2 flex"}>
        {board ? <Board data={board}></Board> : null}
      </div>
    </>
  );
}
