import request from "supertest";

describe("POST /tic-tac-toe/jump-to", () => {
  beforeAll(async () => {
    await request("http://localhost:4000").post("/tic-tac-toe/initialize");

    await request("http://localhost:4000").post(
      "/tic-tac-toe/play?step=0&square=0"
    );
    await request("http://localhost:4000").post(
      "/tic-tac-toe/play?step=1&square=1"
    );
    await request("http://localhost:4000").post(
      "/tic-tac-toe/play?step=2&square=2"
    );
    await request("http://localhost:4000").post(
      "/tic-tac-toe/play?step=3&square=3"
    );
  });

  it("Should return game at given step", () => {
    return request("http://localhost:4000")
      .post("/tic-tac-toe/jump-to?step=1")
      .send()
      .then((response) => {
        expect(response.body).toEqual({
          moves: [
            { move: 0, description: "Go to game start" },
            { move: 1, description: "Go to move #1" },
            { move: 2, description: "Go to move #2" },
            { move: 3, description: "Go to move #3" },
            { move: 4, description: "Go to move #4" },
          ],
          status: "Next player: O",
          squares: ["X", "", "", "", "", "", "", "", ""],
        });
      });
  });
});
