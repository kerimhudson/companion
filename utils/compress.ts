import msgpack5 from "msgpack5";
import { Color } from "../types/colors";
import { nanoid } from "nanoid";
const msgpack = msgpack5();

// We use this to compress to make easy to share URLs
export const encodeColors = (colors: Color[]): string => {
  return msgpack.encode(colors.map((colors) => colors.color)).toString("hex");
};

export const decodeColors = (encodedString: string): Color[] => {
  let colors = msgpack.decode(Buffer.from(encodedString, "hex"));
  colors = colors.map((color: string) => {
    return {
      id: nanoid(),
      locked: false,
      color,
    };
  });

  return colors as Color[];
};
