import { IBoard } from "../Board";
import { ICard } from "../components/Card/Card";

export async function getBoard(id: number) {
  return await fetch(`/api/boards/${id}`);
}

export async function getBucket(ident: string) {
  return await fetch(`/api/buckets/${ident}`);
}

export async function getCard(ident: string) {
  return await fetch(`/api/cards/${ident}`);
}

export async function saveBoard(board: IBoard) {
  return await fetch("/api/boards/", {
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

export async function createCard(bucket_id: string) : Promise<Response> {
  const card = {
    bucket_id: bucket_id,
  }

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  };

  return await fetch(`/api/cards`, options);
}
