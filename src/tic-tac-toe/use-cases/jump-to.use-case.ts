import { Executable } from "../../common/use-case";
import { GameDomainModel } from "../game.domain-model";
import { IBoardRepository } from "../ports/board-repository.port";
import { StepDoesNotExistException } from "../exceptions";

type Input = {
  step: number;
};

type Output = {
  winner: GameDomainModel.Winner;
  history: GameDomainModel.Squares[];
  xIsNext: boolean;
  step: number;
};

export class JumpTo implements Executable<Input, Output> {
  constructor(private boardRepository: IBoardRepository) {}

  execute({ step }: Input): Output {
    const history = this.boardRepository.findHistory();
    const board = history[step];

    if (!board) {
      throw new StepDoesNotExistException();
    }

    return {
      history: history.map((board) => board.squares),
      winner: board.calculateWinner(),
      xIsNext: board.xIsNext(),
      step,
    };
  }
}
