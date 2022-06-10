import { info, move } from "../src/logic";
import { Battlesnake, Coord, GameState, MoveResponse } from "../src/types";

function createGameState(me: Battlesnake, other?: Battlesnake): GameState {
  const snakes = [me];
  if (other) {
    snakes.push(other);
  }
  return {
    game: {
      id: "",
      source: "",
      ruleset: {
        name: "",
        version: "",
        settings: {
          foodSpawnChance: 0,
          minimumFood: 0,
          hazardDamagePerTurn: 0,
          hazardMap: "",
          hazardMapAuthor: "",
          royale: { shrinkEveryNTurns: 0 },
          squad: {
            allowBodyCollisions: false,
            sharedElimination: false,
            sharedLength: false,
            sharedHealth: false,
          },
        },
      },
      timeout: 0,
    },
    turn: 0,
    board: {
      height: 0,
      width: 0,
      food: [],
      snakes,
      hazards: [],
    },
    you: me,
  };
}

function createBattlesnake(id: string, body: Coord[]): Battlesnake {
  return {
    id: id,
    name: id,
    health: 0,
    body: body,
    latency: "",
    head: body[0],
    length: body.length,
    shout: "",
    squad: "",
    customizations: {
      color: "#c306c3",
      head: "default",
      tail: "default",
    },
  };
}

describe("Battlesnake API Version", () => {
  it("should be api version 1", () => {
    const result = info();
    expect(result.apiversion).toBe("1");
  });
});

describe("Battlesnake Moves", () => {
  it("should never move into its own neck", () => {
    // Arrange
    const me = createBattlesnake("me", [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ]);
    const gameState = createGameState(me);

    // Act 1,000x (this isn't a great way to test, but it's okay for starting out)
    for (let i = 0; i < 1000; i++) {
      const moveResponse: MoveResponse = move(gameState);
      // In this state, we should NEVER move left.
      const allowedMoves = ["up", "down", "right"];
      expect(allowedMoves).toContain(moveResponse.move);
    }
  });
});
