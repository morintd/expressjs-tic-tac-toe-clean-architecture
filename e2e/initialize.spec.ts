import request from "supertest";

describe("POST /tic-tac-toe/initialize", () => {
  beforeAll(async () => {
    await request("http://localhost:4000").post("/tic-tac-toe/initialize");
    await request("http://localhost:4000").post(
      "/tic-tac-toe/play?square=0&step=0"
    );
  });

  it("Should return empty game state", () => {
    return request("http://localhost:4000")
      .post("/tic-tac-toe/initialize")
      .send()
      .then((response) => {
        expect(response.body).toEqual({
          status: "Next player: O",
          squares: ["X", "", "", "", "", "", "", "", ""],
          moves: [
            { move: 0, description: "Go to game start" },
            {
              description: "Go to move #1",
              move: 1,
            },
          ],
        });
      });
  });
});
