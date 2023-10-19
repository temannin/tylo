import { IBoard } from "../Board.tsx";
import objectScan from "object-scan";
import { ICard } from "../components/Card.tsx";
import { IBucket } from "../Bucket.tsx";
import { DragOverEvent, UniqueIdentifier } from "@dnd-kit/core";
import { useBoardStore } from "./state.ts";

function cardsAreInADifferentBucket(
  board: IBoard,
  activeId: string,
  overId: string,
): boolean {
  if (!identIsACard(board, activeId) || !identIsACard(board, overId)) return;
  let result = objectScan(["buckets[*].cards[*]"], {
    filterFn: ({ value }) => {
      return value.ident === activeId || value.ident === overId;
    },
    rtn: "gparent",
  })(board);

  return result[0].ident !== result[1].ident;
}

export function move(board: IBoard, event: DragOverEvent, submission: boolean) {
  const { active, over } = event;

  const activeId = active.id as string;
  const overId = over?.id as string;

  if (!overId) return;

  if (!cardsAreInADifferentBucket(board, activeId, overId) && !submission) {
    return false;
  }

  debugger;
  if (activeId !== overId && identIsACard(board, overId)) {
    let card = removeCardByIdent(board, activeId) as ICard;
    addCardToBucket(board, card, overId);
    useBoardStore.getState().setBoard(board);
  } else {
  }
}

export function identIsACard(board: IBoard, ident: string): boolean {
  let result = objectScan([`buckets[*].cards[*].ident`], {
    rtn: "bool",
    filterFn: ({ value }) => {
      return value === ident;
    },
  })(board) as boolean;
  return result;
}

export function findByIdent(
  board: IBoard,
  ident: string,
  relative: string = "parent",
): any {
  let result: ICard[] = objectScan([`buckets[*].cards[*].ident`], {
    rtn: relative,
    filterFn: ({ value }) => {
      return value === ident;
    },
  })(board) as ICard[];
  return result[0];
}

export function removeCardByIdent(board: IBoard, ident: string) {
  return objectScan([`buckets[*].cards[*]`], {
    rtn: "value",
    abort: true,
    filterFn: ({ parent, property, value }) => {
      if (value.ident === ident) {
        parent.splice(property, 1);
        return true;
      }
      return false;
    },
  })(board);
}

export function addCardToBucket(
  board: IBoard,
  card: ICard,
  ident: string,
): boolean {
  let array: IBucket = objectScan([`buckets[*].cards[*]`], {
    rtn: "gparent",
    abort: true,
    filterFn: ({ value }) => {
      if (value.ident === ident) {
        return true;
      }
      return false;
    },
  })(board) as IBucket;

  if (array) {
    let index = 0;
    index = array.cards.findIndex((item) => item.ident === ident);
    console.log(index);
    array.cards.splice(Math.min(index + 1, array.cards.length), 0, card);
    return true;
  }

  return false;
}
