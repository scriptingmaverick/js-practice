import { encode } from "./helper.js";

class Player {
  constructor({ conn, name }) {
    this.name = name;
    this.conn = conn;
    this.pokemonList = this.getPookies();
    this.score = 0;
    this.currentPookie = null;
  }

  getPookies() {
    return [{
      "pokeId": 1,
      "name": "Bulbasaur",
      "hp": 520,
      "moves": [
        { "move_name": "Tackle", "type": "attack", "effect": 60 },
        { "move_name": "Vine Whip", "type": "attack", "effect": 80 },
        { "move_name": "Razor Leaf", "type": "attack", "effect": 95 },
        { "move_name": "Growl", "type": "defense", "effect": 40 },
        { "move_name": "Leech Seed", "type": "defense", "effect": 60 },
      ],
    }, {
      "pokeId": 2,
      "name": "Ivysaur",
      "hp": 680,
      "moves": [
        { "move_name": "Vine Whip", "type": "attack", "effect": 90 },
        { "move_name": "Razor Leaf", "type": "attack", "effect": 110 },
        { "move_name": "Solar Beam", "type": "attack", "effect": 130 },
        { "move_name": "Growl", "type": "defense", "effect": 50 },
        { "move_name": "Synthesis", "type": "defense", "effect": 80 },
      ],
    }, {
      "pokeId": 3,
      "name": "Venusaur",
      "hp": 950,
      "moves": [
        { "move_name": "Solar Beam", "type": "attack", "effect": 150 },
        { "move_name": "Petal Dance", "type": "attack", "effect": 130 },
        { "move_name": "Earth Power", "type": "attack", "effect": 120 },
        { "move_name": "Growth", "type": "defense", "effect": 70 },
        { "move_name": "Leech Seed", "type": "defense", "effect": 90 },
      ],
    }, {
      "pokeId": 4,
      "name": "Charmander",
      "hp": 480,
      "moves": [
        { "move_name": "Scratch", "type": "attack", "effect": 60 },
        { "move_name": "Ember", "type": "attack", "effect": 80 },
        { "move_name": "Flame Burst", "type": "attack", "effect": 100 },
        { "move_name": "Smokescreen", "type": "evade", "effect": 50 },
        { "move_name": "Fire Spin", "type": "attack", "effect": 90 },
      ],
    }];
  }
}

const switchTurn = (state) => {
  const currPlayer = state.currentPlayer;
  state.currentPlayer = state.opponent;
  state.opponent = currPlayer;
};

const createObjects = (players) => {
  const [p1, p2] = players;
  return { currentPlayer: new Player(p1), opponent: new Player(p2) };
};

const display = (player) => {
  const data = player.pokemonList;
  return JSON.stringify(data);
};

const input = async (player) => {
  await player.conn.write(encode(display(player)));
  return;
};

export const startGame = async (players) => {
  const state = createObjects(players);
  let i = 0;
  while (true) {
    const { currentPlayer } = state;

    await input(currentPlayer);

    switchTurn(state);
    if (i++ === 2) break;
  }
};
