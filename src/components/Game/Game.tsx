import { FC } from "react";
import { Field } from "../Field";
import { MainButton } from "../MainButton";
import { MinesCounter } from "../MinesCounter";
import { Timer } from "../Timer";
import styles from "./Game.module.css";

export const Game: FC = () => {
  return (
    <div className={styles.game}>
      <div className={styles.topPanel}>
        <MinesCounter></MinesCounter>
        <MainButton></MainButton>
        <Timer></Timer>
      </div>
      <Field></Field>
    </div>
  );
};
