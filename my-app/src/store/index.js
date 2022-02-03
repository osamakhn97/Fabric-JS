import {configureStore} from '@reduxjs/toolkit';
import CanavsSlice from './CanvasState.js';

const store = configureStore({
    reducer : {canvasState:CanavsSlice.reducer}
});

export const CanvasActions = CanavsSlice.actions;
export default store;

