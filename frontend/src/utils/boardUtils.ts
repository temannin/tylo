import { Active, DragOverEvent, Over, UniqueIdentifier } from "@dnd-kit/core";
import { IBoard } from "../Board.tsx";
import { ICard } from "../components/Card.tsx";
import objectScan from "object-scan";

export function isBelowOverItem(active: Active, over: Over | null): boolean {
  if (over === null) return false;

  let offset = over.rect.height / 2;

  console.log("The over is " + over.id + ", the active is " + active.id);
  console.log(
    "OVER",
    over.rect.top,
    "ACTIVE",
    active.rect.current.translated?.top + offset,
  );

  const isBelowOverItem =
    over &&
    active.rect?.current.translated &&
    active.rect.current.translated.top <= over.rect.top - offset;

  console.log(
    isBelowOverItem
      ? "The active is below the over item"
      : "The active is NOT below the over item",
  );

  if (isBelowOverItem === null || !isBelowOverItem) return false;

  return isBelowOverItem;
}

export function getCard(
  board: IBoard,
  active: UniqueIdentifier,
  remove = false,
  selectors: string | string[] = "value",
): any | undefined {
  let result = objectScan(["buckets[*].cards[*]"], {
    rtn: selectors,
    filterFn: ({ parent, property, value }) => {
      if (value.ident === (active as string)) {
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
    let result: boolean = objectScan(["buckets[*].cards[*]"], {
      rtn: "bool",
      filterFn: ({ value }) => {
        if (value.ident === (element as string)) {
          return true;
        }
        return false;
      },
      abort: true,
    })(board);
    if (!result) return false;
  }

  return true;
}

export function move(board: IBoard, event: DragOverEvent) {
  const { active, over } = event;

  if (!over?.id) return;
  if (over.id === active.id) return;
  if (!areCards(board, [active.id, over.id])) return;

  let activeCard = getCard(board, active.id, true);

  let [overCard, destinationArray]: [
    overCard: ICard,
    destinationArray: ICard[],
  ] = getCard(board, over.id, false, ["value", "parent"]);

  if (activeCard && overCard) {
    let index = destinationArray.findIndex((item) => item.ident === over.id);
    if (isBelowOverItem(active, over)) {
      destinationArray.splice(index + 1, 0, activeCard);
    } else {
      destinationArray.splice(index, 0, activeCard);
    }

    console.log(destinationArray.map((item) => item.ident));
    return board;
  }
}
