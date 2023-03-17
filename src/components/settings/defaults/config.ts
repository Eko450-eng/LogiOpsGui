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
                          keys: ["${thumbwheelLeft.keys![0]}"]
          }
        }
          right: {

          mode: "${thumbwheelRight.mode}"
                  pixels: ${thumbwheelRight.pixels}
                  action: {
            type: "${thumbwheelRight.type}"
                          keys: ["${thumbwheelRight.keys![0]}"]
          }
        }
      
          tap: {
          type: "${thumbwheelTap.type}"
              keys: ["${thumbwheelTap.keys![0]}"]
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
                  keys: ["${gestureButtonUp.keys![0]}"]
                };
              },
              {
                direction: "Down";
                mode: "${gestureButtonDown.mode}";
                action =
                {
                  type: "${gestureButtonDown.type}";
                  keys: ["${gestureButtonDown.keys![0]}"]
                };
              },
              {
                direction: "Left";
                mode: "${gestureButtonLeft.mode}";
                action =
                {
                  type: "${gestureButtonLeft.type}";
                  keys: ["${gestureButtonLeft.keys![0]}"]
                };
              },
              {
                direction: "Right";
                mode: "${gestureButtonRight.mode}";
                action =
                {
                  type: "${gestureButtonRight.type}";
                  keys: ["${gestureButtonRight.keys![0]}"]
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
          };
        },
        {
          cid: 0x53;
          action =
          {
            type: "${backButton.type}";
            keys: ["${backButton.keys![0]}"];
          };
        },
        {
          cid: 0x56;
          action =
          {
            type: "${forwardButton.type}";
            keys: ["${forwardButton.keys![0]}"];
          };
        }
      );
    }
  );`
}
