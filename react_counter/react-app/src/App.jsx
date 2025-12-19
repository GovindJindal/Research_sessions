import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  
  const count= count1 + count2 + count3;
  const primary= () =>{
    setCount1 (count1+1);
    document.getElementById('b').style.color= 'red';
  }
  
  const social= () =>{
    setCount2 (count2+1);
    document.getElementById('c').style.color= 'red';
  }

  const promotions= () =>{
    setCount3 (count3+1);
    document.getElementById('d').style.color= 'red';
  }

  return ( 
    <>
    <div>
      <div className='app'>
        <p>Mail Box</p>
        <hr/>
        <div className='side_nav'>
        <button >All Inbox<sup id="a">{count}</sup></button> 
        <button onClick={primary}>Primary<sup id="b">{count1}</sup></button>
        <button onClick={social}>Social<sup id="c">{count2}</sup></button>
        <button onClick={promotions}>Promotions<sup id="d">{count3}</sup></button>
        </div>
        <div class="mails">
          <div className="mail"><b><i>Hack2Skill</i></b><br/>Dear Govind Jindal,<br/>We’re approaching the end of Week 2! If you haven’t submitted a Skill Badge yet, today is a great opportunity.</div> 
          <div className="mail"><b><i>FutureSkillsPrime</i></b><br/>Dear Govind Jindal,<br/>Thank you for your Order! We’re excited to help you continue your learning journey with FutureSkills Prime.</div>
          <div className="mail"><b><i>CBXperts</i></b><br/>Dear Govind Jindal,<br/>We're sorry for the inconvenience caused — the  webinar has been postponed due to unforeseen circumstances.</div>
          <div className="mail"><b><i>Google AI Studio</i></b><br/>Dear Govind Jindal,<br/>Welcome to Google AI Studio, The fastest path from prompt to production with Gemini.</div>
        </div>
      </div>
    </div>
    </>
  
  )
}
//Blank Opening and Closing Tag to return
export default App


// JSX- Javascript Syntax Extension- used to insert dynamic Javascript into react components with HTML
// classNameName is used instead of className because in Js className is reserved keyword
// one more example we use htmlFor instead of for in label
// {} Curly Braces used to write Js
// JSX- js and html ka milavat