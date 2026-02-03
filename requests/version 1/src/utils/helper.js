const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const decode = (text) => decoder.decode(text);
export const encode = (text) => encoder.encode(text);
