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

  return (
    <div>
    <div className="app">
      <h1 style={{
        fontSize : "1rem"
      }}>Counter</h1></div>
      {count}
      <div><button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
    </div>
  )
}