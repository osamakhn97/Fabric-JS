import {createSlice} from '@reduxjs/toolkit';

const initialCanvas = {
    canvasState:'',
    objects:[]
}

const CanvasSlice = createSlice({
name:'Canvas-State',
initialState:initialCanvas,
reducers:{
    changeCanvasState(state,actions){
        state.canvasState = actions.payload
    },
    setObjects(state,actions){
        state.objects = [actions.payload,...state.objects]

    }
}
})

export default CanvasSlice;