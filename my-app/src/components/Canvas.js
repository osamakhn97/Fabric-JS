import { useEffect } from 'react';
import './Canvas.css';
const Canvas = (props)=>{
    useEffect(()=>{
console.log("mounted");
// setTimeout(() => {
    
//     props.canvas.on('mouse:down');
// }, 2000);
return ()=>{
    console.log('unmounted');
    // props.canvas.on('mouse:up',()=>{console.log('mouse up')});
}
},[])

console.log(props.canvas.__eventListeners);
    return (
        <div className="canvasStyle">

        <canvas  id='canvas'>

        </canvas>
        </div>
    )
}
export default Canvas