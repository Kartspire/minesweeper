import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { removePinch } from "./app/reducers/gameSlice";
import { Game } from "./components/Game";
import "./style.css";

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener("mouseup", () => dispatch(removePinch()));
  }, []);

  return (
    <div className="container">
      <Game></Game>
    </div>
  );
};
