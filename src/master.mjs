import { colors } from './config.mjs';

/**
 * The mind
 */
export default class Master {
  constructor({ tries = 12 } = {}) {
    this.solution = this.generate();
    this.tries = tries;
    this.try = this.try.bind(this);
  }

  /**
   * Try code and substract tries
   * @param param0
   */
  try({ guess = [] }) {
    return Object.assign(this.guess({ guess }), { tries: --this.tries });
  }

  /**
   * Guess code
   * @param param0
   */
  guess({ guess = [] }) {
    if (guess.length !== this.solution.length) return {};

    const obj = { hits: 0, pseudoHits: 0 };
    const solution = this.solution.slice(); // Copy
    const freq = new Array(colors.length).fill(0);
    guess.forEach((v, i) => {
      if (v === this.solution[i]) {
        obj.hits += 1;
        solution[i] = -1;
      } else {
        freq[v]++;
      }
    });

    freq.forEach((v, i) => {
      if (v > 0 && solution.includes(i)) obj.pseudoHits++;
    });

    return obj;
  }

  /**
   * Generate code
   */
  generate() {
    return new Array(4).fill(0).map(() => this.random());
  }

  /**
   * Generate number
   */
  random() {
    return Math.round(Math.random() * 5);
  }
}
