import {configureStore} from '@reduxjs/toolkit';
import CanvasSlice from './CanvasSlice.js';

const store = configureStore({
    reducer: {canvasState:CanvasSlice.reducer}
})

export const CanvasActions = CanvasSlice.actions;
export default store;


