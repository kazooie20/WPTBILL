import React from 'react'
import { MyContext } from '../context'


function stage_2() {
    const context = React.useContext(MyContext);

    return (
        <>
            <div className='result_wrapper'>
                <h3>The Looser is:</h3>
                <h2>{context.state.loser}</h2>

            </div>
            <div className='action_button' onClick={() => context.generateLoser()}>GET NEW LOOSER</div>
                
            <div className='action_button btn_2' onClick={() => context.resetGame()}>START OVER</div>
            
        </>
    )
}

export default stage_2