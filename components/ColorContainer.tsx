import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ColorCard from "./ColorCard";
import useColors from "../hooks/useColors";
import ColorPickerModal from "./ColorPickerModal";
import { Color } from "../types/colors";
import { useRouter } from "next/router";

const ColorContainer = () => {
  const [activeItem, setActiveItem] = useState<
    (Color & { index: number }) | null
  >(null);
  const { colors, initializeColors, setColors } = useColors();
  const router = useRouter();
  useEffect(() => {
    initializeColors();
  }, [router]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    const index = colors.findIndex((item) => item.id === event.active.id);
    setActiveItem({ ...colors[index], index });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <ColorPickerModal />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={colors.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex-1 flex flex-col xl:flex-row gap-4">
            {colors.map((color, index) => (
              <ColorCard key={color.color} {...color} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default ColorContainer;
