export interface ICell {
  x: number;
  y: number;
  pos: number;
  value: number;
  isMine: boolean;
  isOpen: boolean;
  falsyMine: boolean;
  flagIndex: number;
  detonated: boolean;
  isPressed: boolean;
}
