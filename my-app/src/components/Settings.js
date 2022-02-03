import { useState } from "react";
// import {useDispatch,useSelector} from 'react-redux';
// import {CanvasActions} from '../store/index.js';
// import { fabric } from "fabric";
const Settings = (props) => {
  const [color, changeColor] = useState("");
  const [height, changeHeight] = useState("");
  const [width, changeWidth] = useState("");
  const [radius, changeRadius] = useState("");
  const [border,setBorder] = useState("");
  const [allColors, setAll] = useState("");
  // const dispatch = useDispatch();
  // const CanvasState = useSelector(state=>state.canvasState.canvasState);
 
  // const getSelectedItems = ()=>{
  // console.log(props.canvas.getActiveObject());
  // // props.canvas.getActiveObject().fill = 'black';
  // console.log(props.canvas.getActiveObject());
  // props.canvas.renderAll();

  // }
  const colorHandler = (e) => {
    // const b = JSON.stringify(props.canvas);
    // dispatch(CanvasActions.changeCanvasState(b));
    changeColor(e.target.value);

    let a = props.canvas.getActiveObject();
    // console.log(a.type);
    if(a.type === 'group'){
      // console.log(a.getObjects())
      const obj = a.getObjects();
      obj.forEach(e=>{
        // console.log(e.fill);
        e.set('fill',color);
      })
    }
    else{

      a.set("fill", color);
        //  console.log(a);
    }

    props.canvas.requestRenderAll();
  };
  const borderColorHandler = (e)=>{
    setBorder(e.target.value);
    let a = props.canvas.getActiveObject();
    // console.log(a);
    a.set("stroke", border);
    //    console.log(a);

    props.canvas.requestRenderAll();

  }
  const allColorHandler = (e)=>{
      setAll(e.target.value);
      let a=props.canvas.getObjects();
      a.forEach(element => {
          
          if(element.type === 'rect'  ){
              element.set("stroke",allColors)
    
          }
          else if(element.type === 'text'){
              element.set("backgroundColor",allColors)

          }
          else{
            element.set("fill",allColors)
          }
      });
      props.canvas.renderAll();
  }
  const heightChangeHandler = (e) => {
    changeHeight(e.target.value);
  };
  const widthChangeHandler = (e) => {
    changeWidth(e.target.value);
  };
  const radiusChangeHandler = (e) => {
    changeRadius(e.target.value);
  };
  const sizeHandler = () => {
    const type = props.canvas.getActiveObject();
    if (type.type === "rect") {
      if (height !== "") {
        let objH = props.canvas.getActiveObject();

        objH.set("height", parseInt(height));
      }
      if (width !== "") {
        let objW = props.canvas.getActiveObject();
        objW.set("width", parseInt(width));
      }
    } else if (type.type === "circle") {
      console.log(type.type);
      type.set("radius", parseInt(radius));
    }
    else if(type.type === "group"){
      if (height !== "") {
        let objH = props.canvas.getActiveObject();

        // objH.set("scaleX", parseInt(height));
        objH.scaleY(parseInt(height))
      }

      if (width !== "") {
        let objW = props.canvas.getActiveObject();
        // objW.set("scaleY", parseInt(width));
        console.log(objW);
        objW.scaleY(parseInt(width));
      }
    }
    else{
        console.log(type);
        type.set("width",parseInt(width));
    }
    props.canvas.requestRenderAll();
  };
  return (
    <div className="settings">
      <p> Body Color</p>
      <input type="color"  onChange={colorHandler} />
      <br></br>
      <p> Set Border</p>
      <input type="color" onChange={borderColorHandler}  />
      <br></br>
      <p>Apply to all</p>
      <input type="color" onChange={allColorHandler}  />
      <br></br>
      <br></br>
      <label>Height</label>
      <input type="number" onChange={heightChangeHandler} />
      <br />
      
      <label>Width</label>
      <input type="number" onChange={widthChangeHandler} />
      <br />
      <label>Radius</label>
      <input type="number" onChange={radiusChangeHandler} />
      <br />
      <button onClick={sizeHandler}>Apply</button>
    </div>
  );
};
export default Settings;
