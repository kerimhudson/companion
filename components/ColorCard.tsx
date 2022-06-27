import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DotsHorizontalIcon from "./icons/DotsHorizontalIcon";
import DuplicateIcon from "./icons/DuplicateIcon";
import PencilIcon from "./icons/PencilIcon";
import LockOpenIcon from "./icons/LockOpenIcon";
import RoundButton from "./RoundButton";
import useColors from "../hooks/useColors";
import LockCloseIcon from "./icons/LockCloseIcon";
import { Color } from "../types/colors";
import { classNames } from "../utils/classNames";

interface Props extends Color {
  index: number;
}

const ColorCard = ({ id, color, locked, luminance, index }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { toggleLock, setEditingColor } = useColors();

  const copyColorToClipbboard = () => {
    navigator.clipboard.writeText(color.toUpperCase());
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: color,
    zIndeX: isDragging ? 999 : "auto",
  };

  const editColor = () => setEditingColor(index);
  const isDark = luminance <= 0.5;
  return (
    <div
      className="flex-1 basis-32 rounded-lg relative bg-gradient-to-t from-black/10 to-transparent"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div
        {...listeners}
        className={classNames([
          "absolute left-0 top-1/2 -translate-y-1/2 lg:top-0 lg:translate-y-0 lg:left-1/2 lg:-translate-x-1/2 py-8 lg:py-0 lg:px-8 rounded-r-xl lg:rounded-r-none lg:rounded-b-xl",
          isDark ? "text-white bg-white/10" : "bg-black/10",
        ])}
      >
        <div className="w-4 h-4 rotate-90 lg:rotate-0">
          <DotsHorizontalIcon />
        </div>
      </div>

      <div className="group absolute top-1/2 lg:top-auto lg:bottom-16 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-y-0 flex flex-col justify-center items-center gap-4">
        <button
          onClick={editColor}
          className={classNames([
            "py-2 px-4 lg:py-4 lg:px-8 rounded-xl",
            isDark
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-black/10 hover:bg-black/20",
          ])}
        >
          <span className="uppercase font-semibold lg:text-xl">{color}</span>
        </button>
        <div className="flex gap-4">
          <RoundButton isDark={isDark} onClick={editColor}>
            <div className="w-4 h-4">
              <PencilIcon />
            </div>
          </RoundButton>
          <RoundButton isDark={isDark} onClick={copyColorToClipbboard}>
            <div className="w-4 h-4">
              <DuplicateIcon />
            </div>
          </RoundButton>
          <RoundButton isDark={isDark} onClick={() => toggleLock(index)}>
            <div className="w-4 h-4">
              {locked ? <LockCloseIcon /> : <LockOpenIcon />}
            </div>
          </RoundButton>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
