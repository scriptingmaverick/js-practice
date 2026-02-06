import { log } from "node:console";
import { clearAgentScreen, decode, encode } from "./helper.js";

class Player {
  constructor({ conn, name, consoleSize }) {
    this.name = name;
    this.conn = conn;
    this.pokemonList = this.getPookies();
    this.score = 0;
    this.currentPookie = null;
    this.consoleSize = consoleSize;
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

  async selectPokemon(roundId) {
    await clearAgentScreen(this.conn);
    await this.conn
      .write(
        encode(
          roundFormatter(
            `==> Round ${roundId} <==\n`,
            this.consoleSize,
          ),
        ),
      );
    const mapper = (x, i) => `${i + 1}) ${x.name}`;
    const index = await this.getChoice(
      this.pokemonList,
      mapper,
      "Select a pokemon",
    );
    this.currentPookie = this.pokemonList[index];
  }

  async getChoice(choices, mapper, msg) {
    const names = choices.map(mapper)
      .join(
        "\n",
      );

    const buffer = new Uint8Array(1024);
    await this.conn.write(encode(names));

    await this.conn.write(encode(`\n${msg}:`));
    const n = await this.conn.read(buffer);

    const index = parseInt(decode(buffer.subarray(0, n)));
    return index - 1;
  }

  async selectMoves() {
    const { moves, hp } = this.currentPookie;
    const mapper = (x, i) => `${i + 1}) ${x.move_name} (${x.type})`;
    const index = await this.getChoice(moves, mapper, `${hp} -> Select a move`);
    const selectedMove = moves[index];
    return selectedMove;
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
  return "\n" + JSON.stringify(data);
};

const input = async (player) => {
  await player.conn.write(encode(display(player)));
  return;
};

const roundFormatter = (msg, { columns }) => {
  const x = (columns - msg.length) / 2;
  return " ".repeat(x) + msg;
};

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );

const isRoundDone = ({ currentPlayer, opponent }) =>
  currentPlayer.currentPookie.hp > 0 && opponent.currentPookie.hp > 0;

const playRound = async (state) => {
  const { currentPlayer, opponent } = state;
  while (isRoundDone(state)) {
    const move1 = await currentPlayer.selectMoves();
    const move2 = await opponent.selectMoves();

    opponent.currentPookie.hp -= move1.effect * 3;
    currentPlayer.currentPookie.hp -= move2.effect * 3;
  }
};

const createRound = async (state, roundId) => {
  const { currentPlayer, opponent } = state;

  await currentPlayer.selectPokemon(roundId);
  await opponent.selectPokemon(roundId);

  await playRound(state);
};

export const startGame = async (players) => {
  const state = createObjects(players);
  let i = 0;
  while (i++ < 3) {
    await createRound(state, i);
  }
};
