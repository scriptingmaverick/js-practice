class BlockController {
  constructor() {
    this.registers = {};
    this.registers.A = 0x67452301;
    this.registers.B = 0xefcdab89;
    this.registers.C = 0x98badcfe;
    this.registers.D = 0x10325476;
  }

  getRegisters() {
    return { ...this.registers };
  }

  putInRegister(key, value) {
    this.registers[key] = value;
  }

  combine(b, c, d) {
    return;
  }

  getRoundFns() {
    return {
      F: this.fnF,
      G: this.fnG,
      H: this.fnH,
      I: this.fnI,
    };
  }

  fnF(B, C, D) {
    return (B & C) | ((!B) & D);
  }

  fnG(B, C, D) {
    return (B & D) | (C & (!D));
  }

  fnH(B, C, D) {
    return B ^ C ^ D;
  }

  fnI(B, C, D) {
    return C ^ (B | (!D));
  }
}

const convertToBits = (msg) => {
  return msg
    .split("")
    .reduce(
      (hashValue, char) =>
        hashValue + char.charCodeAt().toString(2).padStart(8, 0),
      "",
    );
};

const getPaddingLength = (origLength, bit) => {
  const msgLength = origLength + 1;

  const remainder = msgLength % bit;

  const padValue = remainder <= 448 ? 448 - remainder : bit - (remainder - 448);

  return padValue;
};

// const getBitOfLength = (length) => length.toString(2).padStart(64, 0);

const chunk = (data, blockSize) => {
  const blocks = [];
  for (let i = 0; i < data.length; i += blockSize) {
    blocks.push(data.slice(i, i + blockSize));
  }

  return blocks;
};

const process = (block, _initialVector) => {
  const blockController = new BlockController();
  const { A, B, C, D } = blockController.getRegisters();
  const blocks = chunk(block, 32);
};

const convertToLittleEndian64 = (n) => {
  let val = BigInt(n);
  const bytes = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    bytes[i] = Number(val & 0xFFn);
    val >>= 8n;
  }

  return bytes;
};

const processBlocks = (blocks) => {
  let result = 0;
  for (const block of blocks) {
    result = process(block, result);
  }

  return result;
};

export const hash = (msg) => {
  const bitValue = covertToBits(msg) + "1";
  const msgLength = bitValue.length - 1;

  const paddingLength = getPaddingLength(msgLength, 512);
  const paddedMsg = bitValue.padEnd(paddingLength, 0);

  const wholeMsg = paddedMsg.concat(convertToLittleEndian64(msgLength));

  const blocks = chunk(wholeMsg, 512);
  const hashedValue = processBlocks(blocks);

  return hashedValue;
};
