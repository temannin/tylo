import { IBoard } from "../Board";
import { IBucket } from "../Bucket";
import { ICard } from "../components/Card/Card";

export async function getBoard(id: number) {
  return await fetch(`/api/boards/${id}`);
}

export async function getBucket(ident: string) {
  return await fetch(`/api/buckets/${ident}`);
}

export async function updateBucket(bucket: IBucket) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bucket),
  };

  return await fetch(`/api/buckets/${bucket.id}`, options);
}

export async function getCard(ident: string) {
  return await fetch(`/api/cards/${ident}`);
}

export async function saveBoard(board: IBoard) {
  for (let index = 0; index < board.buckets.length; index++) {
    const element = board.buckets[index];
    for (let cardIndex = 0; cardIndex < element.cards.length; cardIndex++) {
      const card = element.cards[cardIndex];
      if (card.order !== cardIndex) {
        debugger;
        card.order = cardIndex;
        saveCard(card);
      }
    }
  }

  return await fetch(`/api/boards/${board.id}`, {
    method: "PUT",
    body: JSON.stringify(board),
  });
}

export async function saveCard(card: ICard) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  };

  return await fetch(`/api/cards/${card.id}`, options);
}

export async function createCard(bucket_id: string): Promise<Response> {
  const card = {
    bucket_id: bucket_id,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  };

  return await fetch(`/api/cards`, options);
}

export async function createBucket(bucket: IBucket): Promise<Response> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bucket),
  };

  return await fetch(`/api/buckets`, options);
}
