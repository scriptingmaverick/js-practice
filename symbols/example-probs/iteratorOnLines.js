const myIterator = (data) => ({
  [Symbol.iterator]: function () {
    const file = data;
    let i = 0;
    return {
      next() {
        if (i >= file.length) return { done: true };
        const data = file.slice(i);
        const newIndex = data.indexOf("\n");
        if (newIndex === -1) {
          i = file.length;
          return { value: data, done: false };
        }
        const newData = file.slice(i, i + newIndex);
        i += newIndex + 1;
        return { value: newData, done: false };
      },
    };
  },
});

console.log([...myIterator("hi\nhello\nthis\nis\nline separator")]);
console.log([...myIterator("hello\nthis\nis\nline separator")]);
console.log([...myIterator("hi\nhello\nthis\n")]);
// console.log([...myIterator("hi\nhello\nthis\n")]); bug last one not comin
console.log([...myIterator("hi\nhello\n\nline separator")]);
