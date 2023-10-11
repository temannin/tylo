export interface ICard {
    id:         number;
    title:      null;
    bucket_id:  number;
    created_at: Date;
    updated_at: Date;
    ident:      null;
}


export function Card({data}: {data: ICard}) {
    return (
        <><p>{JSON.stringify(data)}</p></>
    );
}
