import chroma from "chroma-js";

export const luminance = (hex: string): number => chroma(hex).luminance();
