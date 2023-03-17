import { IButton, IGesture, IHiresScroll, IMouse, ISmartShift, IThumbwheel, IThumbwheelActions } from "@/interfaces/KeyTypes"

export const templateConfig = (mouse: IMouse,
  smartshift: ISmartShift,
  hiresscroll: IHiresScroll,
  thumbwheel: IThumbwheel,
  thumbwheelLeft: IThumbwheelActions,
  thumbwheelRight: IThumbwheelActions,
  thumbwheelTap: IThumbwheelActions,
  gestureButtonUp: IGesture,
  gestureButtonDown: IGesture,
  gestureButtonLeft: IGesture,
  gestureButtonRight: IGesture,
  centerButton: IButton,
  forwardButton: IButton,
  backButton: IButton,
) => {
  return `
  devices: (
    {
      name: "${mouse.name}";
      dpi: ${mouse.dpi};
      smartshift:
      {
        on: ${smartshift.on};
        threshold: ${smartshift.threshold};
      };
      hiresscroll:
      {
        hires: ${hiresscroll.hires};
        invert: ${hiresscroll.invert};
        target: ${hiresscroll.target};
      };


      thumbwheel:
      {
        divert: ${thumbwheel.divert};
        invert: ${thumbwheel.invert};

        left: {
          mode: "${thumbwheelLeft.mode}"
                  pixels: ${thumbwheelLeft.pixels}
                  action: {
            type: "${thumbwheelLeft.type}"
            ${(thumbwheelLeft.keys && thumbwheelLeft.keys[0]) ? `keys: ["${thumbwheelLeft.keys[0]}"];` : ""}
          }
        }
          right: {

          mode: "${thumbwheelRight.mode}"
                  pixels: ${thumbwheelRight.pixels}
                  action: {
            type: "${thumbwheelRight.type}"
            ${(thumbwheelRight.keys && thumbwheelRight.keys[0]) ? `keys: ["${thumbwheelRight.keys[0]}"];` : ""}
          }
        }
      
          tap: {
          type: "${thumbwheelTap.type}"
            ${(thumbwheelTap.keys && thumbwheelTap.keys[0]) ? `keys: ["${thumbwheelTap.keys[0]}"];` : ""}
        }

      };

      buttons: (
        {
          cid: 0xc3;
          action =
          {
            type: "Gestures";
            gestures: (
              {
                direction: "Up";
                mode: "${gestureButtonUp.mode}";
                action =
                {
                  type: "${gestureButtonUp.type}";
            ${(gestureButtonUp.keys && gestureButtonUp.keys[0]) ? `keys: ["${gestureButtonUp.keys[0]}"];` : ""}
                };
              },
              {
                direction: "Down";
                mode: "${gestureButtonDown.mode}";
                action =
                {
                  type: "${gestureButtonDown.type}";
            ${(gestureButtonDown.keys && gestureButtonDown.keys[0]) ? `keys: ["${gestureButtonDown.keys[0]}"];` : ""}
                };
              },
              {
                direction: "Left";
                mode: "${gestureButtonLeft.mode}";
                action =
                {
                  type: "${gestureButtonLeft.type}";
            ${(gestureButtonLeft.keys && gestureButtonLeft.keys[0]) ? `keys: ["${gestureButtonLeft.keys[0]}"];` : ""}
                };
              },
              {
                direction: "Right";
                mode: "${gestureButtonRight.mode}";
                action =
                {
                  type: "${gestureButtonRight.type}";
            ${(gestureButtonRight.keys && gestureButtonRight.keys[0]) ? `keys: ["${gestureButtonRight.keys[0]}"];` : ""}
                }
              },
              {
                direction: "None"
                mode: "NoPress"
              }
            );
          };
        },

        {
          cid: 0xc4;
          action =
          {
            type = "${centerButton.type}";
            ${(centerButton.keys && centerButton.keys[0]) ? `keys: ["${centerButton.keys[0]}"];` : ""}
          };
        },
        {
          cid: 0x53;
          action =
          {
            type: "${backButton.type}";
            ${(backButton.keys && backButton.keys[0]) ? `keys: ["${backButton.keys[0]}"];` : ""}
          };
        },
        {
          cid: 0x56;
          action =
          {
            type: "${forwardButton.type}";
            ${(forwardButton.keys && forwardButton.keys[0]) ? `keys: ["${forwardButton.keys[0]}"];` : ""}
          };
        }
      );
    }
  );`
}
