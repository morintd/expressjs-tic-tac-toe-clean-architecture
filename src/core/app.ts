import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import { TicTacToeController } from "../tic-tac-toe/tic-tac-toe.controller";
import { TicTacToeModule } from "../tic-tac-toe/tic-tac-toe.module";
import { BoardService } from "../tic-tac-toe/board.service";

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  const service = new BoardService();

  const module = new TicTacToeModule(new TicTacToeController(service));

  module.configure(app);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use((error: any, _req: Request, res: Response) => {
    console.log({ error, _req, res });
    return res.status(error.status || 500).json(error.body);
  });

  return app;
}

export default createApp;
