import { useState } from "react";

function App(){
  //count state incre decre reset
  const [count ,setCount] = useState(0);
  const increment = () => {
    setCount(count+=1)
  }
  const decrement = () => {
  setCount (count -1);
  }
  const reset = () => {
  setCount(count =0);
  };

  return
    <div>
    <div>className="app"
      <h1 style={{
          fontsize: "Irem"
      }}>Counter</h1></div>
    {count}
    <div><button onclick={increment}>Increment</button>
         <button onclick={decrement}>Decrement</button>
         <button onclick={reset}>Reset</button>
    </div>
    </div>
}