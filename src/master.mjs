export default class Master {
  constructor() {
    this.calc = this.calc;
  }

  calc(g, s) {
    if (g.length !== s.length) return;

    // Copy
    const guess = g.slice();
    const solution = s.slice();

    const result = new Result();
    const freq = new Array(4).fill(0);
    for (const i in guess) {
      if (guess[i] === solution[i]) {
        result.hits += 1;
        solution[i] = -1;
      } else {
        freq[guess[i]]++;
      }
    }

    for (const i in freq) {
      if (freq[i] > 0 && solution.includes(Number.parseInt(i)))
        result.pseudoHits++;
    }
    return result;
  }

  code(c) {
    switch (c) {
      case 'B':
        return 0;
      case 'G':
        return 1;
      case 'R':
        return 2;
      case 'Y':
        return 3;
      default:
        return -1;
    }
  }
}

class Result {
  constructor() {
    this.hits = 0;
    this.pseudoHits = 0;
  }
}
