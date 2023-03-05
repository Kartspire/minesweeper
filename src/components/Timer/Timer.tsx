import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { getNumbersIcon } from "../../utils/generateField";
import styles from "./Timer.module.css";

interface TimerProps {}

export const Timer: FC<TimerProps> = () => {
  const started = useAppSelector((state) => state.game.started);
  const won = useAppSelector((state) => state.game.won);
  const lost = useAppSelector((state) => state.game.lost);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (started) {
      interval = setTimeout(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    if ((!started && time !== 0) || time >= 999) {
      clearTimeout(interval!);
      setTime(0);
    }
    if (won || lost) {
      clearTimeout(interval!);
    }

    return () => clearTimeout(interval);
  }, [started, time]);

  return (
    <ul className={styles.timer}>
      <li
        style={{
          backgroundImage: `url(../../src/assets/numbersSvg/${getNumbersIcon(
            time,
            3
          )}.svg)`,
        }}
      ></li>
      <li
        style={{
          backgroundImage: `url(../../src/assets/numbersSvg/${getNumbersIcon(
            time,
            2
          )}.svg)`,
        }}
      ></li>
      <li
        style={{
          backgroundImage: `url(../../src/assets/numbersSvg/${getNumbersIcon(
            time,
            1
          )}.svg)`,
        }}
      ></li>
    </ul>
  );
};
