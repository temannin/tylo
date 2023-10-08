export interface Bucket {
    id: number;
    name: string;
    order: number;
    created_at: Date;
    updated_at: Date;
    board_id: number;
}

export function Bucket({data}: { data: Bucket }) {

    console.log("Bucket")

    return (
        <>
            <div style={{"height": "calc(100vh - 2rem)"}} className={"w-[300px] border-2 my-4 rounded"}>
                <h1>{data.name}</h1>
            </div>
        </>
    );
}
