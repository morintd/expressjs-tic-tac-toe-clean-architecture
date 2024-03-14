import { Board } from "../entities/board.entity";

export interface IBoardRepository {
  findHistory(): Board[];
  setHistory(boards: Board[]): void;
}
