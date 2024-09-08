import React, { useState } from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; 
import "./App.css";
import img1 from './assets/Memory.jpeg'
import img2 from './assets/quiz.jpeg'
import img3 from './assets/projectile.jpeg'
import img4 from './assets/quizninja.jpeg'
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Ninja from './components/Ninja'
import Trigno from './components/Memory'
import Quiz from './components/TrigonometryQuizGame'
import Projectile  from "./components/Projectile";
import Form from "./components/Form";

function App(props) {
    const [memory,setMemory]=useState(false);
    const [ninja,setNinja]=useState(false);
    const [quiz,setQuiz]=useState(false);
    const [project,setProject]=useState(false);
    const [logged,setLogged]=useState(false);
  return (
    <div className=" bg-purple-300" style={{height:'141vh'}}>
      <NavBar logged={logged} setLogged={setLogged} />

      {
        !logged &&
        <Form setLogged={setLogged}/>
      }
    {   logged &&
     <div>
      {   !memory && !ninja && !quiz && !project &&  
         <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
         {/* First Image */}
         <div className="flex justify-center items-center border border-gray-300 flex-col shadow-md">
           <img 
             src={img4}  // Replace with your image URL
             alt="Grid item 1" 
             className="w-[300px] h-[300px] circle-image" 
           />
           <p className="my-2">Ninja Game</p>
           <button onClick={()=>setNinja(true)} className="mb-2">Play Now</button>
         </div>
 
         {/* Second Image */}
         <div className="flex justify-center items-center border border-gray-300 flex-col shadow-md">
           <img 
             src={img1}  // Replace with your image URL
             alt="Grid item 2" 
             className="w-[300px] h-[300px] circle-image" 
           />
           <p className="my-2">Memory Game</p>
           <button onClick={()=>setMemory(true)}>Play Now</button>
         </div>
 
         {/* Third Image */}
         <div className="flex justify-center items-center border border-gray-300 flex-col shadow-md">
           <img 
             src={img2}  // Replace with your image URL
             alt="Grid item 3" 
             className="w-[300px] h-[300px] circle-image" 
           />
           <p className="my-2">Quiz</p>
           <button onClick={()=>setQuiz(true)}>Play Now</button>
         </div>
 
         {/* Fourth Image */}
         <div className="flex justify-center items-center border border-gray-300 flex-col shadow-md">
           <img 
             src={img3} // Replace with your image URL
             alt="Grid item 4" 
             className="w-[300px] h-[300px] circle-image" 
           />
           <p className="my-2 ">Projectile</p>
           <button onClick={()=>setProject(true)}>Play Now</button>
         </div>
       </div>
      }
      {
      ninja && 
      <div>
        <button className="absolute" onClick={()=>setNinja(false)}>Back</button>
        <Ninja/>
      </div>
     }
     {
      quiz && 
      <div>
        <button className="absolute" onClick={()=>setQuiz(false)}>Back</button>
        <Quiz/>
      </div>
     }
     {
      memory && 
      <div>
        <button className="" onClick={()=>setMemory(false)}>Back</button>
        <Trigno/>
      </div>
      
     }
     {
      project && 
      <div>
      <button className="absolute" onClick={()=>setProject(false)}>Back</button>
      <Projectile/>
    </div>
     }
     </div>}
    </div>
  );
}

export default App;
