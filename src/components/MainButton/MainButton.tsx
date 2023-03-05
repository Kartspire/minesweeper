import { FC } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { restart } from "../../app/reducers/gameSlice";
import styles from "./MainButton.module.css";

interface MainButtonProps {}

export const MainButton: FC<MainButtonProps> = () => {
  const dispatch = useDispatch();
  const isPinch = useAppSelector((state) => state.game.isPinch);
  const won = useAppSelector((state) => state.game.won);
  const lost = useAppSelector((state) => state.game.lost);
  const started = useAppSelector((state) => state.game.started);

  function getButtonIcon() {
    if (won) return "won";
    if (lost) return "lost";
    if (isPinch) return "pinched";
    return "default";
  }
  function restartGame() {
    if (!started) return;
    dispatch(restart());
  }

  return (
    <button
      onClick={restartGame}
      className={styles.mainButton}
      style={{
        backgroundImage: `url(assets/svg/${getButtonIcon()}.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></button>
  );
};
