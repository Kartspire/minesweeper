import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { SIZE } from "../../utils/generateField";
import { Cell } from "../Cell";
import styles from "./Field.module.css";

const dimension = new Array(SIZE).fill(0);

export const Field: FC = () => {
  const won = useAppSelector((state) => state.game.won);

  return (
    <div className={styles.field}>
      {dimension.map((_, y) => (
        <div className={styles.row} key={y}>
          {dimension.map((_, x) => (
            <Cell id={+`${y}${x}`} key={+`${y}${x}`} x={x} y={y}></Cell>
          ))}
        </div>
      ))}
    </div>
  );
};
