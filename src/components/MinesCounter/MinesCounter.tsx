import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { getNumbersIcon, MINES } from "../../utils/generateField";
import styles from "./MinesCounter.module.css";

interface MinesCounterProps {}

export const MinesCounter: FC<MinesCounterProps> = () => {
  const minesFlagged = useAppSelector(
    (state) =>
      MINES - state.game.field.filter((cell) => cell.flagIndex === 1).length
  );

  return (
    <ul className={styles.minesCounter}>
      <li
        style={{
          backgroundImage: `url(../../src/assets/numbersSvg/${getNumbersIcon(
            minesFlagged,
            3
          )}.svg)`,
        }}
      ></li>
      <li
        style={{
          backgroundImage: `url(../../src/assets/numbersSvg/${getNumbersIcon(
            minesFlagged,
            2
          )}.svg)`,
        }}
      ></li>
      <li
        style={{
          backgroundImage: `url(../../src/assets/numbersSvg/${getNumbersIcon(
            minesFlagged,
            1
          )}.svg)`,
        }}
      ></li>
    </ul>
  );
};
