import { useEffect } from 'react';
import './Canvas.css';
const Canvas = (props)=>{
    // const unsub = ()=>{
    //     props.canvas.__eventListeners = {};
    
    //     console.log(props.canvas.__eventListeners);
    // }
    useEffect(()=>{
console.log("mounted");
// setTimeout(() => {
    
//     props.canvas.on('mouse:down');
// }, 2000);
return ()=>{
    console.log('unmounted');
    // props.canvas.on('mouse:up',()=>{console.log('mouse up')});
    // unsub();
}
},[])
    return (
        <div className="canvasStyle">

        <canvas  id='canvas'>

        </canvas>
        </div>
    )
}
export default Canvas