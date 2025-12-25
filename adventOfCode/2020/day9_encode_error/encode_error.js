const check = (threshold, window) => {
  let min = 0,
    max = window.length - 1;
  const sortedData = [...window].sort((a, b) => a - b);
  while (min < max) {
    const sum = sortedData[min] + sortedData[max];
    if (sum < threshold) {
      min++;
    } else if (threshold === sum) {
      return true;
    } else {
      max--;
    }
  }

  return false;
};

const encode = (data, windowSize = 5) => {
  let startOfWindow = 0;
  for (let i = windowSize; i < data.length; i++) {
    const newWindow = data.slice(startOfWindow, startOfWindow + windowSize);
    if (!check(data[i], newWindow)) return data[i];

    startOfWindow++;
  }

  return true;
};

const getContiguousList = (data) => {
  const target = encode(data, 25);
  console.log('target -> ',target)
  let end = 2;
  let start = 0;
  let sum = data[0] + data[1];
  while (end < data.length) {
    if (sum < target) {
      sum += data[end];
      end++;
    } else if (sum > target) {
      sum -= data[start++];
    } else {
      const window = data.slice(start, end);
      console.log(window);
      const min = Math.min(...window);
      const max = Math.max(...window);
      return min + max;
    }
  }
};

const main = (fn = encode) => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n").map(Number);
  const example = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
    .split("\n")
    .map(Number);
  return fn(input, 25);
};

console.log(main(getContiguousList));
