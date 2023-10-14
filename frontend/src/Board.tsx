import { Bucket, IBucket } from "./Bucket.tsx";

export interface IBoard {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  buckets: IBucket[];
}

export function Board({ data }: { data: IBoard }) {
  return (
    <>
      {data.buckets?.map((item) => {
        return <Bucket key={item.ident} data={item}></Bucket>;
      })}
    </>
  );
}
