/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import useColors from "../hooks/useColors";

const ColorPickerModal = () => {
  const { colors, editingColor, setEditingColor, updateColor } = useColors();

  const changeColor = editingColor ? updateColor(editingColor) : () => {};

  const [originalColor, setOriginalColor] = useState<string | undefined>();
  useEffect(() => {
    if (editingColor) {
      setOriginalColor(colors[editingColor].color);
    } else {
      setOriginalColor(undefined);
    }
  }, [editingColor]);

  const onDiscard = () => {
    if (originalColor) {
      changeColor(originalColor);
    }
    setEditingColor(undefined);
  };

  const onSave = () => {
    setEditingColor(undefined);
  };

  return (
    <Transition.Root show={Boolean(editingColor)} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onSave}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full md:w-auto sm:p-6">
                <div className="flex justify-center items-center">
                  <Dialog.Title as="h3" className="sr-only">
                    Select a new colour
                  </Dialog.Title>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div>
                      {editingColor ? (
                        <HexColorPicker
                          color={colors[editingColor].color}
                          onChange={changeColor}
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-4">
                      {editingColor ? (
                        <HexColorInput
                          color={colors[editingColor].color}
                          onChange={changeColor}
                          className="border"
                        />
                      ) : null}
                      <button
                        onClick={onSave}
                        className="bg-black/10 py-2 px-4 rounded-lg font-semibold"
                      >
                        Save
                      </button>
                      <button
                        onClick={onDiscard}
                        className="bg-black/10 py-2 px-4 rounded-lg font-semibold"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ColorPickerModal;
