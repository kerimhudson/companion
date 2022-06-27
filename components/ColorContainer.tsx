import React, { useEffect } from "react";
import {
  DndContext,
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

const ColorContainer = () => {
  const { colors, initializeColors, setColors } = useColors();

  useEffect(() => {
    initializeColors();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <ColorPickerModal />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
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

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default ColorContainer;
