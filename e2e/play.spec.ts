import request from "supertest";

describe("POST /tic-tac-toe/play", () => {
  beforeAll(async () => {
    await request("http://localhost:4000").post("/tic-tac-toe/initialize");
    await request("http://localhost:4000").post("/tic-tac-toe/jump-to?step=1");
  });

  it("Should return game after play", () => {
    return request("http://localhost:4000")
      .post("/tic-tac-toe/play?square=0&step=0")
      .send()
      .then((response) => {
        expect(response.body).toEqual({
          status: "Next player: O",
          squares: ["X", "", "", "", "", "", "", "", ""],
          moves: [
            { move: 0, description: "Go to game start" },
            { move: 1, description: "Go to move #1" },
          ],
        });
      });
  });
});
