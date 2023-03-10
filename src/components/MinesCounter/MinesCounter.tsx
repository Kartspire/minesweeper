import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { getNumbersIcon, MINES } from "../../utils/generateField";
import styles from "./MinesCounter.module.css";

export const MinesCounter: FC = () => {
  const minesFlagged = useAppSelector(
    (state) =>
      MINES - state.game.field.filter((cell) => cell.flagIndex === 1).length
  );

  return (
    <ul className={styles.minesCounter}>
      <li
        style={{
          backgroundImage: `url(assets/numbersSvg/${getNumbersIcon(
            minesFlagged,
            3
          )}.svg)`,
        }}
      ></li>
      <li
        style={{
          backgroundImage: `url(assets/numbersSvg/${getNumbersIcon(
            minesFlagged,
            2
          )}.svg)`,
        }}
      ></li>
      <li
        style={{
          backgroundImage: `url(assets/numbersSvg/${getNumbersIcon(
            minesFlagged,
            1
          )}.svg)`,
        }}
      ></li>
    </ul>
  );
};
