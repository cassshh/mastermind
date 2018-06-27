export default class Master {
  constructor({ solution, tries = 12 }) {
    this.solution = solution;
    this.tries = tries;
    this.calc = this.calc;
    this.try = this.try;
  }

  try({ guess = [] }) {
    return Object.assign(this.guess({ guess }), { tries: --this.tries });
  }

  guess({ guess = [] }) {
    if (guess.length !== this.solution.length) return;

    const obj = { hits: 0, pseudoHits: 0 };
    const solution = this.solution.slice(); // Copy
    const freq = new Array(this.solution.length).fill(0);

    guess.forEach((v, i) => {
      if (v === this.solution[i]) {
        obj.hits += 1;
        solution[i] = -1;
      } else {
        freq[v]++;
      }
    });

    freq.forEach((v, i) => {
      if (v > 0 && this.solution.includes(i)) obj.pseudoHits++;
    });

    return obj;
  }
}
