import {useEffect, useState} from "react";
import {getBoard} from "./utils/api.ts";

export interface IBoard {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export function Board({id}: { id: number }) {

    const [data, setData] = useState<IBoard>();

    useEffect(() => {

        console.log(id)

        async function loadBoard() {
            let response = await getBoard(id)
            let board: IBoard = await response.json();

            setData(board)
        }

        loadBoard();
    }, [id])

    return (
        <>
            <div style={{"height": "calc(100vh - 2rem)"}} className={"w-[300px] border-2 my-4 rounded"}>
                <h1>{data?.name}</h1>
            </div>
        </>
    );
}
