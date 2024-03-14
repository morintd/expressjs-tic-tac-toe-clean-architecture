import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import { TicTacToeController } from "../tic-tac-toe/tic-tac-toe.controller";
import { TicTacToeModule } from "../tic-tac-toe/tic-tac-toe.module";
import { Initialize } from "../tic-tac-toe/use-cases/initialize.use-case";
import { InMemoryBoardRepository } from "../tic-tac-toe/adapters/in-memory-board.repository";
import { Play } from "../tic-tac-toe/use-cases/play.use-case";
import { JumpTo } from "../tic-tac-toe/use-cases/jump-to.use-case";
import { GamePresenter } from "../tic-tac-toe/adapters/game.presenter";

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  const repository = new InMemoryBoardRepository();
  const initialize = new Initialize(repository);
  const play = new Play(repository);
  const jumpTo = new JumpTo(repository);
  const presenter = new GamePresenter();

  const module = new TicTacToeModule(
    new TicTacToeController(initialize, play, jumpTo, presenter)
  );

  module.configure(app);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use((error: any, _req: Request, res: Response) => {
    console.log({ error, _req, res });
    return res.status(error.status || 500).json(error.body);
  });

  return app;
}

export default createApp;
