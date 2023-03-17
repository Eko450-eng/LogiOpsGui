export interface IActionType {
  action?: IKeypress | IToggleSmartShift | IToggleHiresScroll | ICycleDPI | IChangeDPI
}

export interface ITypeType {
  type?: string
}

export interface IKeysType {
  keys?: string[] | number[]
}

export interface IKeypress extends IKeysType {
  gestures?: IGesture[]
}

export interface IToggleSmartShift extends IKeysType {
  gestures?: IGesture[]
}

export interface IToggleHiresScroll extends IKeysType {
  gestures?: IGesture[]
}

export interface ICycleDPI extends IKeysType {
  dpis: number[]
  gestures?: IGesture[]
}

export interface IChangeDPI extends IKeysType {
  inc?: number
  gestures?: IGesture[]
}

export interface IGesture extends IKeysType, ITypeType {
  direction?: string
  mode?: string
}

export interface IGestures extends IKeysType {
  type: string
  threshold?: number
  up: IGesture
  down: IGesture
  left: IGesture
  right: IGesture
}

export interface IThumbwheelActions extends IActionType, ITypeType, IKeysType {
  mode?: string
  pixels?: number
}

// Configuration
export interface ISmartShift {
  on: boolean,
  threshold: number,
}

export interface IHiresScroll {
  hires: boolean,
  invert: boolean,
  target: boolean,
}


export interface IThumbwheel {
  divert: boolean
  invert: boolean
}


export interface IButton extends ITypeType, IKeysType {
  gestures?: IGesture[]
}

export interface IButtons {
  gestureButton: IButton,
  centerButton: IButton,
  forwardButton: IButton,
  backButton: IButton,
}

export interface IMouse {
  name: string
  dpi: number
}
