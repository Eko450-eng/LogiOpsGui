import { configureStore } from '@reduxjs/toolkit'
import mouseReducer from './mouseSettings/mouseSlice'
import smartshiftReducer from './mouseSettings/smartshift'
import hiresscrollReducer from './mouseSettings/hiresscroll'
import thumbwheelReducer from './mouseSettings/thumbwheel/thumbwheel'
import thumbwheelLeftReducer from './mouseSettings/thumbwheel/thumbwheelLeft'
import thumbwheelRightReducer from './mouseSettings/thumbwheel/thumbwheelRight'
import thumbwheelTapReducer from './mouseSettings/thumbwheel/thumbwheelTap'
import gestureUpReducer from './mouseSettings/gestures/gestureUp'
import gestureDownReducer from './mouseSettings/gestures/gestureDown'
import gestureLeftReducer from './mouseSettings/gestures/gestureLeft'
import gestureRightReducer from './mouseSettings/gestures/gestureRight'
import centerButtonReducer from './mouseSettings/buttons/centerButton'
import forwardButtonReducer from './mouseSettings/buttons/forwardButton'
import backButtonReducer from './mouseSettings/buttons/backButton'

export const store = configureStore({
  reducer: {
    mouse: mouseReducer,
    smartshift: smartshiftReducer,
    hiresscroll: hiresscrollReducer,
    thumbwheel: thumbwheelReducer,
    thumbwheelLeft: thumbwheelLeftReducer,
    thumbwheelRight: thumbwheelRightReducer,
    thumbwheelTap: thumbwheelTapReducer,
    gestureButtonUp: gestureUpReducer,
    gestureButtonDown: gestureDownReducer,
    gestureButtonLeft: gestureLeftReducer,
    gestureButtonRight: gestureRightReducer,
    centerButton: centerButtonReducer,
    forwardButton: forwardButtonReducer,
    backButton: backButtonReducer,
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
