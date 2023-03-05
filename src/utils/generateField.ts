import { fieldState } from "../app/reducers/gameSlice";
import { ICell } from "../models/ICell";

export const SIZE = 16;
export const MINES = 40;

export function getInitialField() {
  return new Array(SIZE * SIZE).fill(0).map(
    (_, index): ICell => ({
      x: index - Math.trunc(index / SIZE) * SIZE,
      y: Math.trunc(index / SIZE),
      pos: index,
      value: 0,
      isMine: false,
      isOpen: false,
      falsyMine: false,
      flagIndex: 0,
      detonated: false,
      isPressed: false,
    })
  );
}

export function getNeighbours(cell: ICell, field: ICell[]) {
  const x = cell.x;
  const y = cell.y;
  const neighbours = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].filter(([x, y]) => x >= 0 && x < SIZE && y >= 0 && y < SIZE);
  return neighbours.map(([x, y]) => field[y * SIZE + x]);
}

export function initField(clickedCellPos: number) {
  const initialField: ICell[] = getInitialField();

  function incNeighbours(cell: ICell) {
    if (!cell.isMine) {
      cell.value += 1;
    }
  }

  for (let i = 0; i < MINES; ) {
    const x = Math.floor(Math.random() * SIZE);
    const y = Math.floor(Math.random() * SIZE);
    const pos = y * SIZE + x;
    const cell = initialField[pos];
    if (cell.isMine || pos === clickedCellPos) continue;
    cell.isMine = true;
    i += 1;
    getNeighbours(cell, initialField).forEach((cell) => incNeighbours(cell));
  }
  return initialField;
}

export function checkNull(state: fieldState, pos: number) {
  state.field[pos].isOpen = true;
  if (state.field[pos].isMine) {
    state.lost = true;
    state.field[pos].detonated = true;
    state.field
      .filter((cell) => cell.isMine && cell.flagIndex === 0)
      .forEach((cell) => (cell.isOpen = true));
    state.field
      .filter((cell) => cell.flagIndex === 1 && !cell.isMine)
      .forEach((cell) => (cell.falsyMine = true));
  }
  if (state.field.filter((cell) => cell.isOpen).length === SIZE * SIZE - MINES)
    state.won = true;
  if (state.field[pos].value === 0 && !state.field[pos].isMine) {
    getNeighbours(state.field[pos], state.field).forEach((cell) => {
      if (!cell.isOpen) {
        checkNull(state, cell.pos);
      }
    });
  }
}

export function getNumbersIcon(value: number, exponent: number) {
  const number = value.toString().split("")[
    value.toString().split("").length - exponent
  ];
  return number === undefined ? "0" : number;
}

export function addNeighboursPressed(state: fieldState, pos: number) {
  state.field[pos].isPressed = !state.field[pos].isPressed;
}

export function showClosedNeighbours(
  state: fieldState,
  cell: ICell,
  callBack: (state: fieldState, pos: number) => void
) {
  getNeighbours(cell, state.field).forEach((neighbour) => {
    if (!neighbour.isOpen && neighbour.flagIndex !== 1)
      callBack(state, neighbour.pos);
  });
}
