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

const getBitOfLength = (length) => length.toString(2).padStart(64, 0);

const chunk = (msg, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < msg.length; i += chunkSize) {
    chunks.push(msg.slice(i, i + chunkSize));
  }

  return chunks;
};

const processChunks = (chunks) => {};

export const hash = (msg) => {
  const bitValue = covertToBits(msg) + "1";
  const msgLength = bitValue.length - 1;

  const paddingLength = getPaddingLength(msgLength, 512);
  const paddedMsg = bitValue.padEnd(paddingLength, 0);

  const wholeMsg = paddedMsg.concat(getBitOfLength(msgLength));

  const chunks = chunk(wholeMsg, 512);
  const hashedValue = processChunks(chunks);

  return hashedValue;
};
