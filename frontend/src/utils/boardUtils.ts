import { DragOverEvent, UniqueIdentifier } from "@dnd-kit/core";
import { IBoard } from "../Board";
import { ICard } from "../components/Card/Card";
import objectScan from "object-scan";
import { IBucket } from "../Bucket";

export function isBelowOverItem(event: DragOverEvent): boolean {
  const offset = event.delta.y > 1 ? 24 : -24;
  const overLocation = event.over?.rect.top;
  const activeTop = event.active.rect.current.translated?.top;

  console.log(overLocation, activeTop);

  if (!activeTop || !overLocation) throw new Error("Active/Over was undefined");

  const activeLocation = activeTop + offset;
  return activeLocation + offset >= overLocation;
}

export function getCard(
  board: IBoard,
  active: UniqueIdentifier,
  remove = false,
  selectors: string | string[] = "value"
): any | undefined {
  const result = objectScan(["buckets[*].cards[*]"], {
    rtn: selectors,
    filterFn: ({ parent, property, value }) => {
      if (value.id === (active as string)) {
        if (remove) {
          parent.splice(property, 1);
        }
        return true;
      }
      return false;
    },
    abort: true,
  })(board);
  return result;
}

function areCards(board: IBoard, param: (string | number)[]) {
  for (let i = 0; i < param.length; i++) {
    const element = param[i];
    const result = objectScan(["buckets[*].cards[*]"], {
      rtn: "bool",
      filterFn: ({ value }) => {
        if (value.id === (element as string)) {
          return true;
        }
        return false;
      },
      abort: true,
    })(board) as boolean;

    if (!result) return false;
  }

  return true;
}

function moveCardOverCard(board: IBoard, event: DragOverEvent) {
  const { active, over } = event;
  if (!over?.id) return;
  const activeCard = getCard(board, active.id, true);

  const [overCard, destinationArray]: [
    overCard: ICard,
    destinationArray: ICard[],
  ] = getCard(board, over.id, false, ["value", "parent"]);

  if (activeCard && overCard) {
    const index = destinationArray.findIndex((item) => item.id === over.id);
    if (isBelowOverItem(event)) {
      destinationArray.splice(index + 1, 0, activeCard);
    } else {
      destinationArray.splice(index, 0, activeCard);
    }

    return board;
  }
}

function moveCardIntoBucket(board: IBoard, event: DragOverEvent) {
  const bucket = objectScan(["buckets[*]"], {
    rtn: "value",
    filterFn: ({ value }) => {
      return value.id === event.over?.id;
    },
    abort: true,
  })(board) as IBucket | undefined;

  if (!bucket) return;
  if (bucket.cards.some((item) => item.id === event.active.id)) return;

  const card = getCard(board, event.active.id, true);
  bucket.cards.push(card);
}

export function move(board: IBoard, event: DragOverEvent) {
  const { active, over } = event;

  if (!over?.id) return;
  if (over.id === active.id) return;
  if (areCards(board, [active.id, over.id])) {
    moveCardOverCard(board, event);
  } else {
    moveCardIntoBucket(board, event);
  }
}

export function updateCard(board: IBoard, card: ICard) {}
