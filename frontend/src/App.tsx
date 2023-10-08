import {useEffect, useState} from "react";
import {Board, IBoard} from "./Board.tsx";

export default function App() {

    const [boards, setBoards] = useState<number[]>([]);

    useEffect(() => {
        async function loadBoards() {
            const response = await fetch("/api/boards")
            if (!response.ok) return;
            
            let json: IBoard[] = await response.json();
            setBoards(json.map((item) => item.id));
        }

        loadBoards()
    }, [])

    return <>
        <div className={"ml-2"}>{boards.map((item) => <Board key={item} id={item}></Board>)}</div>
    </>
}
