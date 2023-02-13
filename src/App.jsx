import React, { useContext } from 'react'
import './App.css'
import Stage1 from '../components/stage_1'
import Stage2 from '../components/stage_2'
import { MyContext } from '../context'

function App() {
  const context = useContext(MyContext);
  // console.log(context);


  return (
    <div className="wrapper">
      <div className='center-wrapper'>
        <h1>Who Pays the Bill?</h1>
        {context.state.stages === 1 ? <Stage1 /> : <Stage2 /> }
        
      </div>


    </div>
  )
}

export default App
