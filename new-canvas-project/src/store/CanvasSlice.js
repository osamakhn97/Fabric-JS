import {createSlice} from '@reduxjs/toolkit';
const canvasState = {canvas:{}}
const CanvasSlice = createSlice({
    name:'canvas-state',
initialState:canvasState,
reducers:{
    setCanvas(state,actions){
        state.canvas = actions.payload

    }
}

})
export default CanvasSlice