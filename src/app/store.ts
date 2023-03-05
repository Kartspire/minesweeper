import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameSlice from "./reducers/gameSlice";
// import fieldSlice from "./reducers/gameSlice";
// import gameStatusSlice from "./reducers/gameStatusSlice";

export const store = configureStore({
  reducer: {
    game: gameSlice,
    // gameStatus: gameStatusSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
