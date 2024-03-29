import { FC, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  flagCell,
  openCell,
  openNeighbours,
  setField,
  togglePinch,
  start,
  togglePressCell,
} from '../../app/reducers/gameSlice';
import { initField, SIZE } from '../../utils/generateField';
import styles from './Cell.module.css';

interface ICellProps {
  id: number;
  x: number;
  y: number;
}

export const Cell: FC<ICellProps> = ({ id, x, y }) => {
  const pos = y * SIZE + x;
  const dispatch = useAppDispatch();
  const cell = useAppSelector((state) => state.game.field[pos]);
  const started = useAppSelector((state) => state.game.started);
  const won = useAppSelector((state) => state.game.won);
  const lost = useAppSelector((state) => state.game.lost);

  function onLMouseUp() {
    dispatch(togglePinch(cell));
    if (won || lost || cell.flagIndex === 1) return;
    if (!started) {
      dispatch(setField(initField(pos)));
      dispatch(start());
    }
    cell.isOpen ? dispatch(openNeighbours(cell)) : dispatch(openCell(pos));
  }

  function onLMouseDown() {
    dispatch(togglePinch(cell));
  }

  function onRClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (!started) {
      dispatch(setField(initField(pos)));
      dispatch(start());
    }
    if (cell.isOpen || won || lost) return;
    dispatch(flagCell(pos));
  }

  function getCellIcon() {
    if (cell.falsyMine) return 'falsyMine';
    if (
      (!cell.isOpen && cell.isPressed) ||
      (cell.isOpen && cell.value === 0 && !cell.isMine)
    )
      return 'empty';
    if (!cell.isOpen && cell.flagIndex === 0) return 'closed';
    if (!cell.isOpen && cell.flagIndex === 1) return 'flag';
    if (!cell.isOpen && cell.flagIndex === 2) return 'question';
    if (cell.isOpen && cell.isMine && cell.detonated) return 'detonatedMine';
    if (cell.isOpen && cell.isMine && !cell.detonated) return 'mine';
    if (cell.isOpen && !cell.isMine && cell.value !== 0) return cell.value;

    // if (cell.isOpen)
    //   return cell.isMine
    //     ? cell.detonated
    //       ? 'detonatedMine'
    //       : 'mine'
    //     : cell.value === 0
    //     ? 'empty'
    //     : cell.value;
    // return cell.flagIndex
    //   ? cell.flagIndex === 1
    //     ? 'flag'
    //     : 'question'
    //   : 'closed';
  }
  return (
    <button
      className={styles.cell}
      onContextMenu={(event) => onRClick(event)}
      onMouseDown={(event) => event.button === 0 && onLMouseDown()}
      onMouseUp={(event) => event.button === 0 && onLMouseUp()}
      onMouseEnter={() => {
        dispatch(togglePressCell(cell));
      }}
      onMouseOut={() => {
        dispatch(togglePressCell(cell));
      }}
      style={{
        backgroundImage: `url(assets/svg/${getCellIcon()}.svg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    ></button>
  );
};
