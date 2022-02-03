import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import Settings from "./components/Settings";
import "./App.css";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import {CanvasActions} from "./store/index.js";

// import logo from './img.svg';

function App() {
  const dispatch = useDispatch();
  const CanvasState = useSelector(state=>state.canvasState.canvasState);
  // let obj;
  // // console.log(logo);
  // const [activeObjects,setActiveObjects] = useState();
// let objects = [];
const [canvasVisibility, setCanvasVisibility]= useState(true)
  const [canvas, setCanvas] = useState({});
  const [text,setText] = useState("");
  const [objects,setObjects] = useState([]);
  // const [canvasState,setCanvasState] = useState('');
  const [isVisible,setVisible] = useState(false);
 

  const initCanvas = (id) => {
    return new fabric.Canvas(id, {
      width: 500,
      height: 500,
      backgroundColor: "green",
      selection: true,
    });
  };
  useEffect(() => {
    let canvasTemp = initCanvas("canvas");
    if (canvasTemp){
      setCanvas(canvasTemp);
      canvasTemp.on('mouse:down',()=>{
        console.log("mouse down...");
      })
    }
  }, [canvasVisibility]);
  
// const a = JSON.stringify(canvas);
// console.log(canvas);

useEffect(() => {
  if(objects.length>0){
    setVisible(true);
  }
  else{
    setVisible(false);
  }
  objects.forEach(e=>{
    e.on("selected",()=>{
      console.log('hello');

    })
  })
}, [objects]);
// a = canvas.getObjects();
  const uploadSvg = ()=>{
    
    fabric.loadSVGFromURL('http://localhost:3000/img.svg', (objects, option) => {
      const obj1 = fabric.util.groupSVGElements(objects, option);
      obj1.scale(0.1);
      
      obj1.set({left:100,top:150})
      
      obj1.getObjects()[0].set({'fill':'red'});
      obj1.getObjects()[1].set({'fill':'blue'});
      // obj1.getObjects()[2].set({'fill':'yellow'});
      // console.log(obj1.getObjects());
      // obj1.set('viewBoxHeight',900)
      // canvas.contextContainer.strokeRect (
      //   bound.left + 0.5,
      //   bound.top + 0.5

      // )
      console.log('Type:',obj1.type,'\n');
      console.log(obj1.getObjects());
      
  
     canvas.add(obj1);
     canvas.renderAll();
     const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
   
  
  });
  }

  const createRect = () => {
    // const center = canvas.getCenter();
   
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
      left: 100,
      top: 100,
      // originX: center,
      // originY: center,

      // angle:45
    });
    rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
    canvas.add(rect);
    canvas.renderAll();
    const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
    setObjects([rect,...objects]);

    console.log(objects);
   
  };
  const clearCanvas = () => {
    const b = JSON.stringify(canvas);
    // setCanvasState(b);
    dispatch(CanvasActions.changeCanvasState(b));
    const obj = canvas.getObjects();
    obj.forEach((e) => {
      canvas.remove(e);
    });
    setObjects([]);
    // console.log(objects);
    console.log(CanvasState);
  };
  const addCircle = () => {
    // const center = canvas.getCenter();
    var circle = new fabric.Circle({
      radius: 20,
      fill: "yellow",
      left: 100,
      top: 100,
      // originX: center,
      // originY: center,
    });
    circle.set({stroke:'blue'})

    canvas.add(circle);
    setObjects([circle,...objects])
    const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
    console.log(objects);
  };
  const addImg = () => {
    fabric.Image.fromURL(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33A215API_xCeOJU9d_RcSuFr8pskNwBPpQ&usqp=CAU",
      function (oImg) {
        oImg.scale(0.5).set("flipX", true);
        canvas.add(oImg);
        setObjects([oImg,...objects])
        console.log(objects);
        const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
      }
    );
  };
  const addArrow = () => {
    var path = new fabric.Path(
      `M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z`
    );

    canvas.add(path.set({ left: 100, top: 200 }));
    setObjects([path,...objects])
    const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
  };
const addText = ()=>{
  let text = new fabric.Text('hello world', { left: 100, top: 100,
    fontFamily: 'Comic Sans' ,
    fontSize: 50,fontWeight:'bold'});
canvas.add(text);
const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
}
const restore = ()=>{
  canvas.loadFromJSON(CanvasState);
  setVisible(true);
}
const textHandler = (e)=>{
setText(e.target.value);

}
const customText = ()=>{
  let CustomText = new fabric.Text(text, { left: 100, top: 100,
    fontFamily: 'Comic Sans' ,
    fontSize: 50,fontWeight:'bold'});
canvas.add(CustomText);
setObjects([CustomText,...objects])
const a = JSON.stringify(canvas);
    // setCanvasState(a);
    dispatch(CanvasActions.changeCanvasState(a));
 
}
// const fileUploadHandler = (e)=>{
// // console.log(e.target.value);


// }
const toggleMount = ()=>{
setCanvasVisibility(!canvasVisibility);
}
  return (
    <div className="App">
      <div>
      <button onClick={toggleMount}>Toggle Mount</button>

      <h1>Fabric Starting project</h1>
      <button onClick={createRect}>Create Rectangle</button>
      <button onClick={addCircle}>Create Circle</button>
      <button onClick={addImg}>Add Image</button>
      <br></br>

      <button onClick={addArrow}>Add Arrow</button>
      <button onClick={clearCanvas} disabled = {!isVisible} >Clear</button>
      <button onClick={restore}>Restore</button>
      <button onClick={addText}>Add Text</button><br/>
      <input type='text' onChange={textHandler}/><button onClick={customText}>Add Custom Text</button>
      <br/><br/>
      <button onClick={uploadSvg}>Upload SVG</button>
      {/* <label>Upload SVG </label>
      <input type="file" onChange={fileUploadHandler}/>
      <br/>
      <button>Upload</button> */}

      </div>
 {canvasVisibility && <Canvas canvas = {canvas}/>}
 <Settings />

    </div>
  );
}

export default App;
