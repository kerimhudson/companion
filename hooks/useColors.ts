import { atom, useAtom } from "jotai";
import { randomColorPalette, randomColor } from "../utils/randomColor";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { Color } from "../types/colors";
import { luminance } from "../utils/luminance";
import { decodeColors, encodeColors } from "../utils/compress";
import { useRouter } from "next/router";

// We use an atom to keep the state global
const colorsAtom = atom<Color[]>([]);
const editingColorAtom = atom<number | undefined>(undefined);

const useColors = () => {
  const router = useRouter();
  const [colors, setColors] = useAtom(colorsAtom);
  const [editingColor, setEditingColor] = useAtom(editingColorAtom);
  useEffect(() => {
    if (colors.length > 0) {
      window.sessionStorage.setItem("color_palette", JSON.stringify(colors));
    }
  }, [colors]);

  const randomizeColors = () => {
    let currentColors = [...colors];

    const newColors = currentColors.map((current) => {
      if (current.locked) return current;

      const newColor = randomColor();
      return {
        id: nanoid(),
        locked: false,
        color: newColor,
        luminance: luminance(newColor),
      };
    });

    setColors(newColors);
  };

  const initializeColors = () => {
    if (router.query.colors && typeof router.query.colors === "string") {
      const result = decodeColors(router.query.colors);
      if (result) {
        return setColors(result);
      }
    }
    const existingPalette = window.sessionStorage.getItem("color_palette");
    if (existingPalette) {
      const existingColors = JSON.parse(existingPalette);

      return setColors(existingColors);
    }
    let randomColors = randomColorPalette();

    const randomColorsWithLock = randomColors.map((color) => ({
      id: nanoid(),
      locked: false,
      color,
      luminance: luminance(color),
    }));

    setColors(randomColorsWithLock);
  };

  const toggleLock = (index: number) => {
    const currentColors = [...colors];
    currentColors[index].locked = !currentColors[index].locked;
    setColors(currentColors);
  };

  const updateColor = (index: number) => (color: string) => {
    const existingColors = [...colors];

    existingColors[index].color = color;
    setColors(existingColors);
  };

  const shareColors = () => {
    const encodedString = encodeColors(colors);
    return encodedString;
  };

  return {
    colors,
    setColors,
    initializeColors,
    randomizeColors,
    toggleLock,
    updateColor,
    editingColor,
    setEditingColor,
    shareColors,
  };
};

export default useColors;
