import { useState } from "react";
import useColors from "../hooks/useColors";
import { classNames } from "../utils/classNames";

const MobileMotionPermissions = () => {
  const [hidden, setHidden] = useState(false);
  const { randomizeColors } = useColors();
  return (
    <div
      onClick={() => {
        // @ts-ignore
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          // @ts-ignore
          DeviceMotionEvent.requestPermission()
            // @ts-ignore
            .then((permissionState) => {
              if (permissionState === "granted") {
                setHidden(true);
                var sensitivity = 30;

                // Position variables
                var x1 = 0,
                  y1 = 0,
                  z1 = 0,
                  x2 = 0,
                  y2 = 0,
                  z2 = 0;

                window.addEventListener(
                  "devicemotion",
                  function (e) {
                    // @ts-ignore
                    x1 = e.accelerationIncludingGravity.x;
                    // @ts-ignore
                    y1 = e.accelerationIncludingGravity.y;
                    // @ts-ignore
                    z1 = e.accelerationIncludingGravity.z;
                  },
                  false
                );

                // Periodically check the position and fire
                // if the change is greater than the sensitivity
                setInterval(function () {
                  var change = Math.abs(x1 - x2 + y1 - y2 + z1 - z2);

                  if (change > sensitivity) {
                    randomizeColors();
                  }

                  // Update new position
                  x2 = x1;
                  y2 = y1;
                  z2 = z1;
                }, 1000);
              }
            })
            .catch((e: any) => console.log(e));
        }
      }}
      className={classNames([
        "bg-yellow-50 py-4 px-4 text-xs font-semibold lg:hidden",
        hidden ? "hidden" : "",
      ])}
    >
      <span>For optimum experience, click here to allow for Device Motion</span>
    </div>
  );
};

export default MobileMotionPermissions;
