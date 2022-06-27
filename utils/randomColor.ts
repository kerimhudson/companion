import { random, bezier } from "chroma-js";

export const randomColorPalette = (): string[] => {
  const randomColors = Array(5)
    .fill(1)
    .map(() => random().hex());

  const colors = bezier(randomColors).scale().colors(5);
  return colors;
};

export const randomColor = (): string => {
  return random().hex();
};
