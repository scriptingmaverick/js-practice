function solve() {
  const M = 119315717514047n;
  const K = 101741582076661n;
  const POS = 2020n; 

  const input = Deno.readTextFileSync("input.txt")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // 2. Linear Function: f(x) = (ax + b) % M
  // We start with the identity function: f(x) = 1x + 0
  let a = 1n;
  let b = 0n;

  // Helper for proper modular arithmetic (always positive)
  const mod = (n, m) => ((n % m) + m) % m;

  // Helper for modular exponentiation
  function power(base, exp, m) {
    let res = 1n;
    base = mod(base, m);
    while (exp > 0n) {
      if (exp % 2n === 1n) res = mod(res * base, m);
      base = mod(base * base, m);
      exp = exp / 2n;
    }
    return res;
  }

  // Modular Inverse using Fermat's Little Theorem (works since M is prime)
  function modInverse(n, m) {
    return power(n, m - 2n, m);
  }

  // 3. Compose all instructions into a single (a, b)
  for (const line of input) {
    if (line === "deal into new stack") {
      // Transformation: x -> -x - 1
      // New a = -a, New b = -b - 1
      a = mod(-a, M);
      b = mod(-b - 1n, M);
    } else if (line.startsWith("cut")) {
      const n = BigInt(line.split(" ").pop());
      // Transformation: x -> x - n
      // New b = b - n
      b = mod(b - n, M);
    } else if (line.startsWith("deal with increment")) {
      const n = BigInt(line.split(" ").pop());
      // Transformation: x -> nx
      // New a = a * n, New b = b * n
      a = mod(a * n, M);
      b = mod(b * n, M);
    }
  }

  // 4. Apply the linear transformation K times
  // A = a^K
  // B = b * (a^K - 1) * (a - 1)^-1
  const Ak = power(a, K, M);
  const Bk = mod(b * (Ak - 1n) * modInverse(a - 1n, M), M);

  // 5. Solve for the card at position POS
  // The forward shuffle is: POS = (Ak * card + Bk) % M
  // To find the card: card = (POS - Bk) * Ak^-1 % M
  const invAk = modInverse(Ak, M);
  const card = mod((POS - Bk) * invAk, M);

  console.log(`The card at position ${POS} is: ${card.toString()}`);
}

solve();
