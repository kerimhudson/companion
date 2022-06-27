import { Popover } from "@headlessui/react";
import { useEffect, useState } from "react";
import useColors from "../hooks/useColors";
import DuplicateIcon from "./icons/DuplicateIcon";
import GiftIcon from "./icons/GiftIcon";

const Header = () => {
  const { colors, randomizeColors, shareColors } = useColors();
  const [copied, setCopied] = useState(false);
  const [shareLink, setShareLink] = useState<string>();

  useEffect(() => {
    setShareLink(`${window.location.origin}/?colors=${shareColors()}`);
  }, [colors]);

  const copyShareLinkToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  return (
    <header className="py-6 px-4 flex items-center justify-between">
      <div className="bg-black/10 py-2 px-4 rounded-3xl inline-flex group">
        <h1 className="font-semibold">Splash</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={randomizeColors}
          className="bg-black/10 py-2 px-4 rounded-3xl inline-flex group items-center font-semibold"
        >
          <span>Shuffle</span>
          <div className="w-0 group-hover:w-5 transition-all duration-300 group-hover:ml-2">
            <GiftIcon />
          </div>
        </button>
        <Popover className="relative">
          <Popover.Button
            as="button"
            className="bg-black/10 py-2 px-4 rounded-3xl inline-flex group items-center font-semibold"
          >
            <span>Share</span>
            <div className="w-0 group-hover:w-5 transition-all duration-300 group-hover:ml-2">
              <GiftIcon />
            </div>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 origin-top-right absolute right-0 mt-2 w-80 bg-white py-4 px-6 rounded-lg border shadow-lg">
            <div>
              <span className="inline-block mb-2">
                Share the below link with someone to share your palette
              </span>
              <div className="border bg-gray-100 focus-within:bg-gray-300 rounded-lg flex items-center">
                <input
                  onClick={copyShareLinkToClipboard}
                  readOnly
                  value={copied ? "Copied" : shareLink}
                  className="px-4 bg-transparent flex-1 outline-none"
                  type="text"
                ></input>
                <button
                  onClick={copyShareLinkToClipboard}
                  className="border-l w-10 h-10 p-2 text-gray-600"
                >
                  <DuplicateIcon />
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
