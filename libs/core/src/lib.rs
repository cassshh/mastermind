// #![allow(dead_code, unused)]

use rand::prelude::*;
// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

type Code = [u8; 4];

enum Result {
    Win(Code),
    Lose(GuessResult, Code),
    Attempt(GuessResult),
}

#[derive(Debug, Default)]
struct GuessResult {
    hits: u8,
    psuedo_hits: u8,
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct GameOptions {
    pub tries: u8,
    pub pieces: u8,
}

impl Default for GameOptions {
    fn default() -> Self {
        Self {
            tries: 12,
            pieces: 6,
        }
    }
}

// wasm-pack requires "exported" functions
// to include #[wasm_bindgen]
#[wasm_bindgen]
#[derive(Debug)]
pub struct GameState {
    game_options: GameOptions,
    pub tries: u8,
    solution: Code,
}

// wasm-pack requires "exported" functions
// to include #[wasm_bindgen]
#[wasm_bindgen]
#[allow(dead_code)]
impl GameState {
    pub fn new() -> Self {
        let options = GameOptions::default();
        Self {
            solution: generate_code(&options),
            tries: options.tries,
            game_options: options,
        }
    }

    pub fn get_game_options(self) -> GameOptions {
        self.game_options
    }

    fn set_game_options(&mut self, options: GameOptions) -> &Self {
        self.tries = options.tries;
        self.game_options = options;
        self
    }

    fn set_solution(&mut self, code: Code) -> &Self {
        self.solution = code;
        self
    }

   fn guess(&mut self, guess: Code) -> Result {
        // copy solution, because we're modifying it
        let mut solution = self.solution;
        // init default result
        let mut result: GuessResult = GuessResult::default();
        let mut frequency = vec![0; self.game_options.pieces.into()];

        for (index, value) in guess.iter().enumerate() {
            if value.eq(&solution[index]) {
                // if hit
                result.hits += 1; // increase result hits
                solution[index] = u8::MAX; // modify solution at index
            } else {
                frequency[*value as usize] += 1;
            }
        }

        for (value, count) in frequency.iter().enumerate() {
            if *count > 0 && solution.contains(&(value as u8)) {
                // if has count and still exists within (modified) solution
                result.psuedo_hits += 1;
            }
        }

        self.tries -= 1;
        if result.hits.eq(&4) {
            return Result::Win(self.solution);
        }

        if self.tries.eq(&0) {
            return Result::Lose(result, self.solution);
        }

        Result::Attempt(result)
    }

    fn state_string(self) -> String {
        format!("(state) {:#?}", self)
    }
}

fn generate_code(options: &GameOptions) -> Code {
    let mut code: Code = [0; 4];
    let mut rng = rand::thread_rng();

    for x in &mut code {
        *x = rng.gen_range(0..options.pieces);
    }
    //TODO: Validate of code is valid
    code
}

#[cfg(test)]
mod tests {
    use crate::*;

    #[test]
    fn it_configures() {
        let game = GameState::new();
        let default_options = GameOptions::default();
        assert_eq!(game.game_options.tries, default_options.tries);
        assert_eq!(game.game_options.pieces, default_options.pieces);
        assert_eq!(game.tries, default_options.tries);
    }

    #[test]
    fn it_sets_game_options() {
        let mut game = GameState::new();
        let options = GameOptions {
            tries: 8,
            pieces: 4,
        };
        game.set_game_options(options);
        assert_eq!(game.game_options.tries, 8);
        assert_eq!(game.game_options.pieces, 4);
        assert_eq!(game.tries, 8);
    }

    #[test]
    fn it_sets_solution() {
        let mut game = GameState::new();
        let code = generate_code(&game.game_options);
        game.set_solution(code);
        assert_eq!(game.solution, code);
    }

    #[test]
    fn it_tries_go_down() {
        let mut game = GameState::new();
        game.set_solution([1, 1, 1, 1]);
        game.guess([0, 0, 0, 0]);
        game.guess([0, 0, 0, 0]);
        game.guess([0, 0, 0, 0]);
        assert_eq!(game.tries, GameOptions::default().tries - 3)
    }

    #[test]
    fn it_guess_hits_correct_0() {
        let mut game = GameState::new();
        game.set_solution([1, 1, 2, 3]);
        if let Result::Attempt(result) = game.guess([0, 0, 1, 2]) {
            assert_eq!(result.hits, 0);
            return;
        }
        unreachable!();
    }

    #[test]
    fn it_guess_hits_correct_1() {
        let mut game = GameState::new();
        game.set_solution([1, 1, 2, 3]);
        if let Result::Attempt(result) = game.guess([1, 0, 1, 2]) {
            assert_eq!(result.hits, 1);
            return;
        }
        unreachable!();
    }

    #[test]
    fn it_guess_hits_correct_2() {
        let mut game = GameState::new();
        game.set_solution([1, 1, 2, 3]);
        if let Result::Attempt(result) = game.guess([1, 1, 0, 0]) {
            assert_eq!(result.hits, 2);
            return;
        }
        unreachable!();
    }

    #[test]
    fn it_guess_hits_correct_3() {
        let mut game = GameState::new();
        game.set_solution([1, 1, 2, 3]);
        if let Result::Attempt(result) = game.guess([0, 1, 2, 3]) {
            assert_eq!(result.hits, 3);
            return;
        }
        unreachable!();
    }

    #[test]
    fn it_guess_win() {
        let mut game = GameState::new();
        game.set_solution([1, 1, 2, 3]);
        let result = game.guess([1, 1, 2, 3]);
        assert!(matches!(result, Result::Win { .. }));
        if let Result::Win(solution) = result  {
            assert_eq!(solution, [1, 1, 2, 3]);
        } else {
            unreachable!()
        }
    }

    #[test]
    fn it_guess_lose() {
        let mut game = GameState::new();
        let options = GameOptions {
            tries: 4,
            ..Default::default()
        };
        game.set_game_options(options);
        game.set_solution([1, 1, 2, 3]);
        game.guess([0, 0, 0, 0]);
        game.guess([0, 0, 0, 0]);
        game.guess([0, 0, 0, 0]);
        let result = game.guess([0, 0, 0, 0]);
        assert!(matches!(result, Result::Lose { .. }));
        if let Result::Lose(_, solution) = result  {
            assert_eq!(solution, [1, 1, 2, 3]);
        } else {
            unreachable!()
        }
    }
}
