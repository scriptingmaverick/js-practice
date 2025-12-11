export function* infiniteNums() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

export const range = 10;
