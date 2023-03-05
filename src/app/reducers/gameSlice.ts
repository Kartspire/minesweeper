import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICell } from "../../models/ICell";
import {
  addNeighboursPressed,
  checkNull,
  getInitialField,
  getNeighbours,
  showClosedNeighbours,
} from "../../utils/generateField";

export interface fieldState {
  field: ICell[];
  won: boolean;
  lost: boolean;
  started: boolean;
  isPinch: boolean;
}

const initialState: fieldState = {
  field: getInitialField(),
  won: false,
  lost: false,
  started: false,
  isPinch: false,
};

export const fieldSlice = createSlice({
  name: "fieldSlice",
  initialState,
  reducers: {
    setField(state, action: PayloadAction<ICell[]>) {
      state.field = action.payload;
    },
    openCell(state, action: PayloadAction<number>) {
      checkNull(state, action.payload);
    },
    openNeighbours(state, action: PayloadAction<ICell>) {
      const flaggedAround = getNeighbours(action.payload, state.field).filter(
        (cell) => cell.flagIndex === 1
      ).length;
      if (flaggedAround === action.payload.value)
        showClosedNeighbours(state, action.payload, checkNull);
    },
    flagCell(state, action: PayloadAction<number>) {
      state.field[action.payload].flagIndex !== 2
        ? (state.field[action.payload].flagIndex += 1)
        : (state.field[action.payload].flagIndex = 0);
    },
    togglePinch(state, action: PayloadAction<ICell>) {
      state.isPinch = true;
      if (!state.field[action!.payload.pos].isOpen) {
        state.field[action!.payload.pos].isPressed =
          !state.field[action!.payload.pos].isPressed;
      } else showClosedNeighbours(state, action!.payload, addNeighboursPressed);
    },
    removePinch(state) {
      state.isPinch = false;
    },
    togglePressCell(state, action: PayloadAction<ICell>) {
      if (state.isPinch && !state.field[action.payload.pos].isOpen) {
        state.field[action.payload.pos].isPressed =
          !state.field[action.payload.pos].isPressed;
      }
      if (state.isPinch && state.field[action.payload.pos].isOpen) {
        showClosedNeighbours(state, action.payload, addNeighboursPressed);
      }
    },
    start(state) {
      state.started = true;
    },
    restart(state) {
      state.field = getInitialField();
      state.won = false;
      state.lost = false;
      state.started = false;
      state.isPinch = false;
    },
  },
});

export default fieldSlice.reducer;
export const {
  setField,
  openCell,
  flagCell,
  openNeighbours,
  togglePinch,
  removePinch,
  togglePressCell,
  start,
  restart,
} = fieldSlice.actions;
