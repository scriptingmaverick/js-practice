const expenseEntriesIn = (report) => {
  const sortedReport = report.sort((a, b) => a - b);
  let i = 0;
  while (i < sortedReport.length - 3) {
    let j = i + 1;
    while (j < sortedReport.length - 2) {
      let k = j + 1;
      while (k < sortedReport.length - 1) {
        const sum = sortedReport[i] + sortedReport[j] + sortedReport[k];
        console.log(sortedReport[i], sortedReport[j], sortedReport[k]);
        if (sum === 2020)
          return sortedReport[i] * sortedReport[j] * sortedReport[k];
        if (sum > 2020) break;
        k++;
      }
      j++;
    }
    i++;
  }
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n").map(Number);
  return expenseEntriesIn(input);
};

console.log(main());
