import { Response, NextFunction } from "express";
import { JumpTo } from "./use-cases/jump-to.use-case";
import { Play } from "./use-cases/play.use-case";
import { Initialize } from "./use-cases/initialize.use-case";
import {
  CellAlreadyTakenException,
  StepDoesNotExistException,
} from "./exceptions";
import { BadRequestException } from "../common/exceptions/bad-request.exception";
import { IGamePresenter } from "./ports/game-presenter.port";

export class TicTacToeController {
  constructor(
    private initialize: Initialize,
    private play: Play,
    private jumpTo: JumpTo,
    private presenter: IGamePresenter
  ) {}

  handleInitialize(res: Response) {
    const game = this.initialize.execute();
    res.status(201).json(this.presenter.format(game));
  }

  handlePlay(res: Response, next: NextFunction, step: number, square: number) {
    try {
      const game = this.play.execute({ step, square });
      res.status(201).json(this.presenter.format(game));
    } catch (e) {
      if (e instanceof StepDoesNotExistException) {
        return next(
          new BadRequestException({
            error: "step does not exist",
          })
        );
      }

      if (e instanceof CellAlreadyTakenException) {
        return next(
          new BadRequestException({
            error: "cell already taken",
          })
        );
      }

      next(e);
    }
  }

  handleJumpTo(res: Response, next: NextFunction, step: number) {
    try {
      const game = this.jumpTo.execute({ step });
      res.status(201).json(this.presenter.format(game));
    } catch (e) {
      if (e instanceof StepDoesNotExistException) {
        return next(
          new BadRequestException({
            error: "step does not exist",
          })
        );
      }

      next(e);
    }
  }
}
