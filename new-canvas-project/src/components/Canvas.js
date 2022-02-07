import { useEffect, useState } from "react";
// import { useDispatch,  } from "react-redux";
import { fabric } from "fabric";
// import { CanvasActions } from "../store";

const Canvas = () => {
  const [canvas, setCanvas] = useState({});

  const initCanvas = (id) => {
    return new fabric.Canvas(id, {
      width: 500,
      height: 500,
      backgroundColor: "#2e87ba",
      selection: true,
    });
  };
  useEffect(() => {
      console.log('mounted');
    let canvasTemp = initCanvas("canvas");
    if (canvasTemp) {
      setCanvas(canvasTemp);
      canvasTemp.on("mouse:down", () => {
        console.log("mouse down");
      });
      console.log(canvasTemp.__eventListeners);
      return () => {
          console.log('unmounted');
        canvasTemp.off("mouse:down");
        console.log(canvasTemp.__eventListeners);
      };
    }
  }, []);
  return (
    <>
      <div className="myCanvas">
        <canvas id="canvas"></canvas>
      </div>
    </>
  );
};
export default Canvas;
