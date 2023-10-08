import {Bucket} from "./Bucket.tsx";

export interface IBoard {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    buckets: Bucket[];
}

export function Board({data}: { data: IBoard }) {

    return (
        <>
            {data.buckets?.map((item) => {
                return <Bucket data={item}></Bucket>
            })}
        </>
    );
}
