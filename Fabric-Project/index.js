console.log("hello world");
let color  = "#000000";
let mousePressed = false;
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 500,
    height: 500,
    selection:false
  });
};
const canvas = initCanvas("c");
document.getElementById('favcolor').addEventListener('change',(e)=>{
    console.log(e.target.value);
    color = e.target.value;
    canvas.freeDrawingBrush.color = color;
   let a = canvas.getActiveObject();
//    a.fill = color;
   a.set('fill',color);
   console.log(a);
    canvas.renderAll();
})

let currentMode ;
const modes = {
    pan : 'pan',
    draw:'draw'
}

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img;
    canvas.requestRenderAll();
  });
};
const togglemode  = (mode)=>{
    
    if(mode === modes.pan){
        console.log(mode);

    if(currentMode === modes.pan){
        currentMode = ""
    }
    else{
        currentMode = modes.pan;
        canvas.isDrawingMode = false;
        canvas.renderAll();
    }
    }
    else if(mode === modes.draw){

        if(currentMode === modes.draw){
            currentMode = "";
            canvas.isDrawingMode = false;
            canvas.renderAll();
        }
        else{
            // canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
            // canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
            document.getElementById('favcolor').addEventListener('change',(e)=>{
                console.log(e.target.value);
                color = e.target.value;
            })
            canvas.freeDrawingBrush.color = color;
            canvas.freeDrawingBrush.width =15;
            currentMode = modes.draw;
            canvas.isDrawingMode = true;
        canvas.renderAll();
        }
        console.log(mode);


    }
    
}
setBackground(
  "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  canvas
);
canvas.on('mouse:move',(event)=>{
    // console.log(event.e);
    if(mousePressed && currentMode === modes.pan){
        canvas.setCursor('grab');
        
        canvas.renderAll();
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
        canvas.relativePan(delta);
    }
  
 
})

canvas.on('mouse:down',(event)=>{
    mousePressed = true;
    if( currentMode === modes.pan){

        canvas.setCursor('grab');
        canvas.renderAll();
    }
})
canvas.on('mouse:up',(event)=>{
    mousePressed = false;
    if(currentMode === modes.pan){

        canvas.setCursor('default');
        canvas.renderAll();
    }
})
const clearCanvas = (canvas)=>{

    const obj = canvas.getObjects();
    obj.forEach(e => {
        if(e!==canvas.backgroundImage){
            canvas.remove(e)
        }
    });
    console.log(obj);
}

const circle = (canvas)=>{
    const center = canvas.getCenter();
    const cir = new fabric.Circle({
      radius:50,
        fill:'yellow',
        left:center.left,
        top:center.height,
        // originX:center,
        // originY:center,
        
    })
    canvas.add(cir);
    canvas.renderAll();

    cir.animate('top',canvas.height-50,{
        onchange:canvas.renderAll.bind(canvas)
    })
   
}
const rect = ()=>{
    
    const center = canvas.getCenter();
    const rect = new fabric.Rect({
        width:100,
        height:100,
        fill:'red',
        left:center.left,
        top:center.top,
        // originX:center,
        // originY:center,
        
        // angle:45
    })
    canvas.add(rect);
    canvas.renderAll();
    rect.animate('top',center.top,{
        onchange:canvas.renderAll.bind(canvas)
    })
}