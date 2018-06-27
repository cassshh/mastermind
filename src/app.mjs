import './mm-app.mjs';
import Master from './master.mjs';

// hit  | pseudo
const c1 = [3, 2, 2, 0];
const c2 = [2, 1, 1, 0];
// 1  | 1

const master = new Master({ solution: c1 });
// console.log(master.guess({ guess: c2 }));
console.log(master.try({ guess: c2 }));
